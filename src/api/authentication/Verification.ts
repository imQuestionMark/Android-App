import type { AxiosError } from 'axios';
import { router } from 'expo-router';
import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { showError } from '@/components/ui';

import { client } from '../common';

const API = 'user/validate-otp';

export const OTPInputschema = z.object({
  OTP: z.string({ required_error: 'Please enter otp' }),
});

export type Variables = z.infer<typeof OTPInputschema>;

const OTPResponseschema = z.object({
  status: z.number(),
  message: z.string(),
  token: z.string(),
});

type Response = z.infer<typeof OTPResponseschema>;

const validOtp = async (data: Variables) => {
  const response = await client.post(API, data);
  console.log(response);
  //return OTPResponseschema.parse(response.data);
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

export const resendOtpMutation = createMutation<
  Response,
  Variables,
  AxiosError
>({ mutationFn: validOtp });
