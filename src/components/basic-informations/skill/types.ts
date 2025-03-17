import { type Control } from 'react-hook-form';

import { type SkillsFormData } from './schema';

export type TDropdownData = {
  label: string;
  value: string;
};

export type SkillsInfoControl = {
  control: Control<SkillsFormData>;
};
