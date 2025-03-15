import { type Control } from 'react-hook-form';

import { type ProjectFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type ProjectInfoControl = {
  control: Control<ProjectFormData>;
};
