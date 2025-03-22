import { z } from 'zod';

export const profileFormSchema = z
  .object({
    fName: z
      .string()
      .min(1, 'First Name is required.')
      .max(50, 'First Name cannot exceed 50 characters.'),
    lName: z
      .string()
      .min(1, 'Last Name is required.')
      .max(50, 'Last Name cannot exceed 50 characters.'),
    email: z
      .string()
      .email('Invalid email address.')
      .min(1, 'Email is required.'),
    phNo: z
      .string()
      .regex(/^\d{10}$/, 'Phone number must be 10 digits.')
      .min(10, 'Phone number must be 10 digits.')
      .max(10, 'Phone number must be 10 digits.'),
    location: z.string().min(1, 'Location is required.'),
    prefLocation: z.array(z.string()).min(1, 'Preferred Location is required.'),
    workModes: z.array(z.string()).min(1, 'Select at least one work mode'),
    currentCTC: z.coerce
      .number({
        required_error: 'Current CTC is required.',
        invalid_type_error: 'Current CTC must be a valid number.',
      })
      .positive('Current CTC must be greater than 0')
      .transform(String),
    expectedCTC: z.coerce
      .number({
        required_error: 'Expected CTC is required.',
        invalid_type_error: 'Expected CTC must be a valid number.',
      })
      .positive('Expected CTC must be greater than 0')
      .transform(String),
  })
  .refine((data) => Number(data.expectedCTC) > Number(data.currentCTC), {
    message: 'Expected CTC must be greater than Current CTC.',
    path: ['expectedCTC'],
  });

export type ProfileFormData = z.infer<typeof profileFormSchema>;
