import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export const SignUpInputschema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  emailAddress: z.string({ required_error: 'Email is required' }).email(),
  phone: z
    .string({ required_error: 'Phone no. is required' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Invalid phone number',
    }),
});

export type Variables = z.infer<typeof SignUpInputschema>;

const SignUpResponseschema = z.object({
  status: z.number(),
  message: z.string(),
  id: z.string(),
});

type Response = z.infer<typeof SignUpResponseschema>;

const submitForm = async (data: Variables) => {
  const response = await client.post(API_ROUTES.SIGNUP, data);
  return SignUpResponseschema.parse(response.data);
};

export const useSignUpMutation = createMutation<Response, Variables, Error>({
  mutationFn: submitForm,
  onSuccess: () => {
    router.replace({ pathname: '/(authentication)/personal-details' });
  },
});
