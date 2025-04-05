import z from 'zod';

export const SkillsBaseFormSchema = z.object({
  skill: z.string().min(1, 'Skill is required'),
  exp: z.string().min(1, 'Experience is required'),
  proficiency: z.string().min(1, 'Proficiency is required'),
});

export const SkillsFormSchema = z.object({
  skill: z.array(SkillsBaseFormSchema),
  addSkills: SkillsBaseFormSchema.optional(),
});

export type SkillsFormData = z.infer<typeof SkillsFormSchema>;
