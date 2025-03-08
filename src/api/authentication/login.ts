import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { saveUserID } from '@/lib/store/user-store';
import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';
import { devLog } from '@/lib/utils';

export const loginInputSchema = z.object({
  identifier: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

export type Variables = z.infer<typeof loginInputSchema>;

const loginResponseSchema = z.object({
  status: z.number(),
  message: z.string({ required_error: 'Message is missing in the Response' }),
  data: z.object({
    id: z.string({ required_error: 'ID is missing in the Response' }),
  }),
});

type Response = z.infer<typeof loginResponseSchema>;

const loginRequest = async (data: Variables) => {
  const response = await client.post(API_ROUTES.LOGIN, data);
  return loginResponseSchema.parse(response.data);
};

export const useLoginMutation = createMutation<Response, Variables, Error>({
  mutationFn: loginRequest,
  onSuccess: async (data) => {
    devLog('Valid email:', data);
    // @INFO Saving the userID in expo-secure-store.
    await saveUserID(data.data.id);
    router.replace({
      pathname: '/verification',
      params: { entryPoint: 'login' },
    });
  },
});
