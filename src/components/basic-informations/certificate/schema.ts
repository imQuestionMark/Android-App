import z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const CertificateFormSchema = z.object({
  certificate: z.array(
    z.object({
      certificateName: z.string().min(1, 'Label is required'),
      issueDate: z.date({ required_error: 'Issue Date is required' }),
      certificate: z
        .instanceof(File, { message: 'File is required' })
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          'File size should be less than 5MB'
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Invalid file type, only JPG, PNG, WEBP allowed'
        ),
    })
  ),
  addCertificate: z
    .array(
      z.object({
        certificateName: z.string().min(1, 'Label is required'),
        issueDate: z.date({ required_error: 'Issue Date is required' }),
        certificate: z
          .instanceof(File, { message: 'File is required' })
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            'File size should be less than 5MB'
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'Invalid file type, only JPG, PNG, WEBP allowed'
          ),
      })
    )
    .optional(),
});

export type CertificateFormData = z.infer<typeof CertificateFormSchema>;
