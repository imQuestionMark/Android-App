import z from 'zod';

export const LinksBaseFormSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Invalid URL'),
});

export const LinksFormSchema = z.object({
  links: z.array(LinksBaseFormSchema),
  addLinks: LinksBaseFormSchema.optional(),
});

export type LinksFormData = z.infer<typeof LinksFormSchema>;
