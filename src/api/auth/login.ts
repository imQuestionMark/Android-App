import { showError } from '@/components/ui';
import { client } from '../common';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { router, useRouter } from 'expo-router';
import { z } from 'zod';

const MOCK_FAILURE = 'http/404/Invalid Email Credentials';
const MOCK_SUCCESS = 'http/200/1234?delay=1500';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

export type Variables = z.infer<typeof loginSchema>;

const loginResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof loginResponseSchema>;

const submitLoginForm = async (data: Variables) => {
  const response = await client.post(MOCK_FAILURE, data);
  return loginResponseSchema.parse(response.data);
};

export const useLoginMutation = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: submitLoginForm,
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
