import { type Control } from 'react-hook-form';

import { type ProfessionalFormData } from '@/api/authentication/professional-details';

export type TDropdownData = {
  label: string;
  value: number;
};

export type ProfessionalControl = {
  control: Control<ProfessionalFormData>;
};
