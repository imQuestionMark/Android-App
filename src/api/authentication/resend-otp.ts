import { createMutation } from 'react-query-kit';
import { z } from 'zod';

import { getUserID } from '@/lib/store/user-store';
import { API_ROUTES } from '@/routes/api-routes';

import { client } from '../common';

export const ResendOtpInputSchema = z.object({
  userId: z.string({ required_error: 'Invalid user' }),
});

export type Variables = void;

const ResendOtpResponseschema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.object({ id: z.string() }),
});

type Response = z.infer<typeof ResendOtpResponseschema>;

const resendOtp = async () => {
  const userID = await getUserID();
  const data = {
    userId: userID,
  };
  const response = await client.post(API_ROUTES.REGENERATE_OTP, data);
  return ResendOtpResponseschema.parse(response.data);
};

export const resendOtpMutation = createMutation<Response, Variables, Error>({
  mutationFn: resendOtp,
});
