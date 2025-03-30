import z from 'zod';

const AchivementBaseFormSchema = z.object({
  title: z.string({ required_error: '' }),
  desc: z.string(),
  attachment: z.string().optional(),
});

export const AchivementFormSchema = z.object({
  achievement: z.array(AchivementBaseFormSchema),
  addAchievement: AchivementBaseFormSchema.optional(),
});

export type AchivementFormData = z.infer<typeof AchivementFormSchema>;
