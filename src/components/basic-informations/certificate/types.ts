import { type Control } from 'react-hook-form';

import { type CertificateFormData } from './schema';

export type CertificateControl = {
  control: Control<CertificateFormData>;
};
