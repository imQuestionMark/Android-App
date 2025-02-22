import z from 'zod';

export const professionalFormSchema = z
  .object({
    roles: z.array(z.string()).min(1, 'Select at least one role'),
    locations: z.array(z.string()).min(1, 'Select at least one location'),
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
  .refine(
    (data) => Number(data.expectedCTC) > Number(data.currentCTC),
    'Expected CTC must be greater than current CTC'
  );

export type ProfessionalFormData = z.infer<typeof professionalFormSchema>;
