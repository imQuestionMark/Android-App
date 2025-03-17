import z from 'zod';

export const SkillsFormSchema = z.object({
  skill: z.array(
    z.object({
      skill: z.string().min(1, 'Skill is required'),
      exp: z.string().min(1, 'Experience is required'),
      proficiency: z.string().min(1, 'Proficiency is required'),
    })
  ),
  locations: z.string().min(1, 'Select your current location'),
  addSkill: z
    .object({
      skill: z.string().min(1, 'Skill is required'),
      exp: z.string().min(1, 'Experience is required'),
      proficiency: z.string().min(1, 'Proficiency is required'),
    })
    .optional(),
});

export type SkillsFormData = z.infer<typeof SkillsFormSchema>;
