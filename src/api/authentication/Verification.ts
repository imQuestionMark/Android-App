import { showError } from '@/components/ui';
import { client } from '../common';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import { router, useRouter } from 'expo-router';
import { z } from 'zod';
import { API_ROUTES } from '@/routes/api-routes';

export const OTPInputschema = z.object({
  otp: z.string({ required_error: 'Please enter otp' }),
});

export type Variables = z.infer<typeof OTPInputschema>;

const OTPResponseschema = z.object({
  status: z.number(),
  message: z.string(),
  token: z.string(),
});

type Response = z.infer<typeof OTPResponseschema>;

const validOtp = async (data: Variables) => {
  const response = await client.post(API_ROUTES.VALIDATE_OTP, data);
  console.log(response);
  // return OTPResponseschema.parse(response.data);
  return response.data;
};

export const useOtpMutation = createMutation<Response, Variables, AxiosError>({
  mutationFn: validOtp,
  onSuccess: (data) => {
    console.log('Login successful:', data);
    router.replace({ pathname: '/personal-details' });
  },
  onError: (error: AxiosError) => {
    console.error(error);
    showError(error);
  },
});
