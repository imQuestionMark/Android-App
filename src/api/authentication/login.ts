import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export const loginInputSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

export type Variables = z.infer<typeof loginInputSchema>;

const loginResponseSchema = z.object({
  id: z.string({ required_error: 'ID is missing in the Response' }),
  status: z.number({ required_error: 'Status is missing in the Response' }),
  messagess: z.string({ required_error: 'Message is missing in the Response' }),
});

type Response = z.infer<typeof loginResponseSchema>;

const submitForm = async (data: Variables) => {
  const response = await client.post(API_ROUTES.LOGIN, data);
  return loginResponseSchema.parse(response.data);
};

export const useLoginMutation = createMutation<Response, Variables, Error>({
  mutationFn: submitForm,
  onSuccess: (data) => {
    console.log('Login successful:', data);
    router.replace({ pathname: '/verification' });
  },
});
