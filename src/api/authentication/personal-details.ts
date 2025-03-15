import { z } from 'zod';

export const personalDetailsSchema = z.object({
  nationality: z.string({ required_error: 'Nationality must be selected' }),
  DOB: z
    .string({ required_error: 'Date of Birth is required' })
    .date('Invalid Date received'),
});

export type PersonalDetailsProps = z.infer<typeof personalDetailsSchema>;
