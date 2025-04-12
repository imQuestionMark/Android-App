import z from 'zod';

export const BasicInfoFormSchema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  email: z.string({ required_error: 'Email is required' }).email(),
  phoneNo: z
    .string({ required_error: 'Phone no. is required' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Invalid phone number',
    }),
  locations: z.string({ required_error: 'Select your current location' }),
  TBY: z
    .string()
    .refine((value) => value.split(/\s+/).filter(Boolean).length <= 150, {
      message: 'Description must not exceed 150 words',
    }),
});

export type BasicInfoFormData = z.infer<typeof BasicInfoFormSchema>;
