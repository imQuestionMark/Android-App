import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export const OTPInputSchema = z.object({
  otp: z
    .string({ required_error: 'Please enter otp' })
    .min(4, 'Please enter a valid otp'),
});

export type Variables = z.infer<typeof OTPInputSchema>;

const OTPResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    token: z.string({ required_error: 'Token not found' }),
  }),
});

type Response = z.infer<typeof OTPResponseSchema>;

const validOtp = async (data: Variables) => {
  // import userID from expo-secure-store:
  const userId = '67b365cfc73d9fe54c790711';
  const response = await client.post(API_ROUTES.VALIDATE_OTP, {
    ...data,
    userId,
  });
  return OTPResponseSchema.parse(response.data);
};

export const useOtpMutation = createMutation<Response, Variables, Error>({
  mutationFn: validOtp,
  onSuccess: (data) => {
    console.log('OTP Validation successful:', data);
    router.replace({ pathname: '/personal-details' });
  },
});
