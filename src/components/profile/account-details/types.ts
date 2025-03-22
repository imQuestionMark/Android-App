import { type Control } from 'react-hook-form';

import { type ProfileFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: number;
};

export type ProfileControl = {
  control: Control<ProfileFormData>;
};
