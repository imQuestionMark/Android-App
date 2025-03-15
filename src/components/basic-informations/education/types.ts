import { type Control } from 'react-hook-form';

import { type EducationFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type EducationInfoControl = {
  control: Control<EducationFormData>;
};
