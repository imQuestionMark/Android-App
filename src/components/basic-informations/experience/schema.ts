import z from 'zod';

export const ExperienceBaseFormSchema = z.object({
  currentWorking: z.string().min(1, 'Please select any one value'),
  companyName: z.string().min(1, 'Company Name is required'),
  role: z.string(),
  joinDate: z.string().min(4, 'Join Date is required'),
  leaveDate: z.string().min(4, 'Leave Date is required'),
  locations: z.string().min(1, 'Select your Company location'),
});

export const ExperienceFormSchema = z.object({
  experience: z.array(ExperienceBaseFormSchema),
  addExperience: ExperienceBaseFormSchema.optional(),
});

export type ExperienceFormData = z.infer<typeof ExperienceFormSchema>;
