import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { saveFirstName, saveUserID } from '@/lib/store/user-store';
import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

const _DANGEROUS_INTERNAL_TENANT_ID = 'uCp1eujFVA';

export const SignUpInputschema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  emailAddress: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
  phone: z
    .string({ required_error: 'Phone no. is required' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Invalid phone number',
    }),
});

export type Variables = z.infer<typeof SignUpInputschema>;

const SignUpResponseschema = z.object({
  status: z.number(),
  message: z.string({ required_error: 'Message is missing in the Response' }),
  data: z.object({
    id: z.string({ required_error: 'ID is missing in the Response' }),
  }),
});

type Response = z.infer<typeof SignUpResponseschema>;

// @TODO Refactor using promise.all to run this in parallel.
const signupRequest = async (data: Variables) => {
  // @TODO: We are saving the firstName temporarily to show the name right away on personal-details screen. Ideally, there will be an API call I believe.
  await saveFirstName(data.firstName);
  const response = await client.post(API_ROUTES.SIGNUP, data, {
    headers: {
      tenant_id: _DANGEROUS_INTERNAL_TENANT_ID,
    },
  });
  return SignUpResponseschema.parse(response.data);
};

export const useSignUpMutation = createMutation<Response, Variables, Error>({
  mutationFn: signupRequest,
});
