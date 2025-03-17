import z from 'zod';

export const AchivementFormSchema = z.object({
  achivement: z.array(
    z.object({
      title: z.string().optional(),
      desc: z.string().optional(),
      attachment: z.string().optional(),
    })
  ),

  addAchivement: z
    .object({
      title: z.string().optional(),
      desc: z.string().optional(),
      attachment: z.string().optional(),
    })
    .optional(),
});

export type AchivementFormData = z.infer<typeof AchivementFormSchema>;
