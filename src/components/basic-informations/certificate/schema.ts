import z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const CertBaseSchema = z.object({
  certificateName: z
    .string({ required_error: 'Certificate Name is required' })
    .min(3, 'Certificate Name should be atleast 3 characters.'),
  // issueDate: z.date({ required_error: 'Issue Date is required' }),
  // certificate: z
  //   .instanceof(File, { message: 'File is required' })
  //   .refine(
  //     (file) => file.size <= MAX_FILE_SIZE,
  //     'File size should be less than 5MB'
  //   )
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     'Invalid file type, only JPG, PNG, WEBP allowed'
  //   ),
});

export const CertificateFormSchema = z.object({
  certificate: z.array(CertBaseSchema),
  addCertificate: CertBaseSchema,
});

export type CertificateFormData = z.infer<typeof CertificateFormSchema>;
