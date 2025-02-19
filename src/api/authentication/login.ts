import type { AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { showError } from '@/components/ui';

import { client } from '../common';

const API = 'user/signin?method=ML';

export const loginInputSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

export type loginput = z.infer<typeof loginInputSchema>;

const loginResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof loginResponseSchema>;

const submitForm = async (data: loginput) => {
  const response = await client.post(API, data);
  //return loginResponseSchema.parse(response.data);
  return response.data;
};

export const useLoginMutation = createMutation<Response, loginput, AxiosError>({
  mutationFn: submitForm,
  onSuccess: (data) => {
    console.log('Login successful:', data);
    router.replace({ pathname: '/verification' });
  },
  onError: (error: AxiosError) => {
    console.error(error);
    showError(error);
  },
});
