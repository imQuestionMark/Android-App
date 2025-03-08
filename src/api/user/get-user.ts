import { createQuery } from 'react-query-kit';
import { z } from 'zod';

import { devLog } from '@/lib/utils';
import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export const userSchema = z.object({
  _id: z.string(),
  tenant_id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string().email(),
  role: z.enum(['user', 'admin', 'other']),
  status: z.string(),
  phone: z.string().regex(/^\d{10}$/),
  onboarding_status: z.string(),
  is_online: z.boolean(),
});

export const userResponseSchema = z.object({
  status: z.literal(200),
  message: z.string(),
  data: userSchema,
});

type Response = z.infer<typeof userResponseSchema>;
type Variables = void;

const fetchUser = async () => {
  const response = await client.get(API_ROUTES.GET_USER);
  devLog('UserResponse', response);
  return userResponseSchema.parse(response.data.data);
};

export const useUser = createQuery<Response, Variables, Error>({
  queryKey: ['user'],
  fetcher: fetchUser,
});
