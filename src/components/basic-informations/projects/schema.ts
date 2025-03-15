import z from 'zod';

export const ProjectFormSchema = z.object({
  project: z.array(
    z.object({
      companyName: z.string().min(1, 'Company Name is required'),
      projectTitle: z.string().min(1, 'Project Name is required'),
      client: z.string().min(1, 'Client Name is required'),
      workFrom: z.string({ required_error: 'From Year is required' }),
      workTo: z.string({ required_error: 'To Year is required' }),
      projectDesc: z.string().min(1, 'Project Description is required'),
      probSolved: z.string().optional(),
      skills: z.string().min(1, 'Select your skills'),
      projectLink: z.string().min(1, 'Project Link is required'),
    })
  ),
  companyName: z.string().min(1, 'Company Name is required'),
  addProject: z
    .object({
      companyName: z.string().min(1, 'Company Name is required'),
      projectTitle: z.string().min(1, 'Project Name is required'),
      client: z.string().min(1, 'Client Name is required'),
      workFrom: z.string({ required_error: 'From Year is required' }),
      workTo: z.string({ required_error: 'To Year is required' }),
      projectDesc: z.string().min(1, 'Project Description is required'),
      probSolved: z.string().optional(),
      skills: z.string().min(1, 'Select your skills'),
      projectLink: z.string().min(1, 'Project Link is required'),
    })
    .optional(),
});

export type ProjectFormData = z.infer<typeof ProjectFormSchema>;
