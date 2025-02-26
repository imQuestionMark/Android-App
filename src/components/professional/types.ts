import { type Control } from 'react-hook-form';

import { type ProfessionalFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: number;
};

export type ProfessionalControl = {
  control: Control<ProfessionalFormData>;
};
