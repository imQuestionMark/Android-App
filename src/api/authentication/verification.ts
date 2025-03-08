import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { signIn } from '@/lib/store/auth-store';
import { getUserID } from '@/lib/store/user-store';
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
  const userId = await getUserID();

  console.log('🚀🚀🚀 ~ validOtp ~ userId:', userId);

  const response = await client.post(API_ROUTES.VALIDATE_OTP, {
    ...data,
    userId,
  });
  return OTPResponseSchema.parse(response.data);
};

export const useOtpMutation = createMutation<Response, Variables, Error>({
  mutationFn: validOtp,
  onSuccess: async (data) => {
    console.log('OTP Validation successful:', data);
    // @INFO Saving the token in expo-secure-store.
    await signIn(data.data.token);
    router.replace({ pathname: '/(protected)/home' });
  },
});
