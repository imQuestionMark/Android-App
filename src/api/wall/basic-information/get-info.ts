import { createQuery } from 'react-query-kit';
import { z } from 'zod';

import { client } from '@/api/common';
import { API_ROUTES } from '@/routes/api-routes';

export const basicInfoSchema = z.array(
  z.object({
    firstName: z.string({ required_error: 'FirstName is required' }),
    lastName: z.string({ required_error: 'LastName is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    phoneNumber: z.string({ required_error: 'Phone no. is required' }),
    locations: z.string({ required_error: 'Select your current location' }),
    about: z.string(),
  })
);

export const basicInfoResponseSchema = z.object({
  status: z.literal(200),
  message: z.string({ required_error: 'Message is missing in the RESPONSE' }),
  data: basicInfoSchema,
});

type Response = z.infer<typeof basicInfoResponseSchema>;
type Variables = void;

const getBasicInfo = async () => {
  const response = await client.get(API_ROUTES.BASIC_INFORMATION);
  return basicInfoResponseSchema.parse(response.data.data);
};

export const useUser = createQuery<Response, Variables, Error>({
  queryKey: ['basic-information'],
  fetcher: getBasicInfo,
});
