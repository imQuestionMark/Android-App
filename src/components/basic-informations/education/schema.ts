import z from 'zod';

export const EducationFormSchema = z.object({
  education: z.array(
    z.object({
      intName: z.string().min(1, 'Institution Name is required'),
      FOS: z.string().min(1, 'Field of Study is required'),
      GPA: z.string().optional(),
      startyear: z.string({ required_error: 'Start Year is required' }),
      endyear: z.string({ required_error: 'End Year is required' }),
      locations: z.string().min(1, 'Select your current location'),
    })
  ),
  locations: z.string().min(1, 'Select your current location'),
  addEducation: z
    .object({
      intName: z.string().min(1, 'Institution Name is required'),
      FOS: z.string().min(1, 'Field of Study is required'),
      GPA: z.string().optional(),
      startyear: z.string({ required_error: 'Start Year is required' }),
      endyear: z.string({ required_error: 'End Year is required' }),
      locations: z.string().min(1, 'Select your current location'),
    })
    .optional(),
});

export type EducationFormData = z.infer<typeof EducationFormSchema>;
