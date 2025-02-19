import type { AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { showError } from '@/components/ui';

import { client } from '../common';

//const MOCK_FAILURE = 'http/404/Invalid Email Credentials';t
const API = 'user/signup';

export const SignUpInputschema = z.object({
  first_name: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  last_name: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  email_address: z.string().min(1, 'Email is required').email(),
  phone: z.coerce
    .number({
      required_error: 'Phone no. is required.',
      message: 'Must be only numbers',
    })
    .min(10, 'Phone number must be 10 digits')
    //.max(10, 'Phone number must be 10 digits')
    .transform(String),
});

export type Variables = z.infer<typeof SignUpInputschema>;

const SignUpResponseschema = z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof SignUpResponseschema>;

const submitForm = async (data: Variables) => {
  const response = await client.post(API, data);
  return SignUpResponseschema.parse(response.data);
};

export const useSignUpMutation = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: submitForm,
  onSuccess: (data) => {
    console.log('Login successful:', data);
    router.replace({ pathname: '/login' });
  },
  onError: (error: AxiosError) => {
    console.error(error);
    showError(error);
  },
});
