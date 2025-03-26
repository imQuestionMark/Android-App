import z from 'zod';

const EducationItem = z.object({
  intName: z
    .string({ required_error: 'Institution Name is required' })
    .min(3, 'Institution Name is required'),
  FOS: z
    .string({ required_error: 'Field of Study is required' })
    .min(2, 'Field of Study is required'),
  startyear: z
    .string({ required_error: 'Start Year is required' })
    .min(1, 'Start Year is invalid'),
  endyear: z
    .string({ required_error: 'End Year is required' })
    .min(1, 'End Year is invalid'),
  locations: z
    .string({ required_error: 'Location is required' })
    .min(1, 'Select your current location'),
  GPA: z.string().optional(),
});

export const EducationFormSchema = z.object({
  education: z.array(EducationItem),
  addEducation: EducationItem.optional(),
});

export type EducationFormData = z.infer<typeof EducationFormSchema>;

export type IEducationItem = z.infer<typeof EducationItem>;
