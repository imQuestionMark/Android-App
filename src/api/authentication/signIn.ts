import { showError } from '@/components/ui';
import { client } from '../common';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { router, useRouter } from 'expo-router';
import { z } from 'zod';

const MOCK_FAILURE = 'http/404/Invalid Email Credentials';
const MOCK_SUCCESS = 'http/200/1234?delay=1500';

export const loginInputSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

export type Variables = z.infer<typeof loginInputSchema>;

const loginResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof loginResponseSchema>;

const submitForm = async (data: Variables) => {
  const response = await client.post(MOCK_SUCCESS, data);
  //return loginResponseSchema.parse(response.data);
  return response.data;
};

export const useLoginMutation = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: submitForm,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.replace({ pathname: '/verification' });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      showError(error);
    },
  }
);
