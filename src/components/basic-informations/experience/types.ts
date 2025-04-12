import { type Control } from 'react-hook-form';

import { type ExperienceFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type ExperienceInfoControl = {
  control: Control<ExperienceFormData>;
};
