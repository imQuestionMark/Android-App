import { type Control } from 'react-hook-form';

import { type BasicInfoFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type BasicInfoControl = {
  control: Control<BasicInfoFormData>;
};
