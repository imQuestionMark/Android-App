import { type Control } from 'react-hook-form';

import { type AchivementFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type AchivementInfoControl = {
  control: Control<AchivementFormData>;
};
