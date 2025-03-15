import z from 'zod';

export const LinksFormSchema = z.object({
  links: z.array(
    z.object({
      label: z.string().min(1, 'Label is required'),
      url: z.string().url('Invalid URL'),
    })
  ),
  newlinks: z.string({ required_error: 'Please Enter Label Name' }),
});

export type LinksFormData = z.infer<typeof LinksFormSchema>;
