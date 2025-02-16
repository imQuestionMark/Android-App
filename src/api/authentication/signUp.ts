import { showError } from '@/components/ui';
import { client } from '../common';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { router, useRouter } from 'expo-router';
import { z } from 'zod';

const MOCK_FAILURE = 'http/404/Invalid Email Credentials';
const MOCK_SUCCESS = 'http/200/1234?delay=1500';



export const SignUpInputschema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  email: z.string().min(1, 'Email is required').email(),
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


const SignUpResponseschema =z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof SignUpResponseschema>;

const submitForm = async (data: Variables) => {
  const response = await client.post(MOCK_SUCCESS, data);
  return SignUpResponseschema.parse(response.data);
};

export const useSignUpMutation = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: submitForm,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.replace({ pathname: '/login' });
    },
    onError: (error: AxiosError) => {
      console.error(error);
      showError(error);
    },
  }
);