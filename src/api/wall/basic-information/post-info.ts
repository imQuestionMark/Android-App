import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { client } from '@/api/common';
import { API_ROUTES } from '@/routes/api-routes';

export const basicInfoInputSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  email: z.string({ required_error: 'Email is required' }).email(),
  phoneNumber: z
    .string({ required_error: 'Phone no. is required' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Invalid phone number',
    }),
  locations: z.string({ required_error: 'Select your current location' }),
  about: z
    .string()
    .refine((value) => value.split(/\s+/).filter(Boolean).length <= 150, {
      message: 'Description must not exceed 150 words',
    }),
});

export type Variables = z.infer<typeof basicInfoInputSchema>;

const basicInfoResponseSchema = z.object({
  status: z.number(),
  message: z.string({ required_error: 'Message is missing in the Response' }),
  data: z.object({
    id: z.string({ required_error: 'ID is missing in the Response' }),
  }),
});

type Response = z.infer<typeof basicInfoResponseSchema>;

const basicInfoRequest = async (data: Variables) => {
  const response = await client.post(API_ROUTES.BASIC_INFORMATION, data);
  return basicInfoResponseSchema.parse(response.data);
};

export const useCreateBasicInfoMutation = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: basicInfoRequest,
});
