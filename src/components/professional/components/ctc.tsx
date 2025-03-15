import { type UseFormSetValue, useWatch } from 'react-hook-form';

import { ControlledInput } from '@/components/ui';

import { type ProfessionalFormData } from '../schema';
import type { ProfessionalControl } from '../types';

type CTCProps = ProfessionalControl & {
  setValue: UseFormSetValue<ProfessionalFormData>;
};

export const CTC = ({ control, setValue }: CTCProps) => {
  const currentCTC = useWatch({ control, name: 'currentCTC' }) || '';

  const formatToLPA = (value: string) => (value ? `${value} LPA` : '');
  const removeNonNumeric = (value: string) => value.replace(/\D/g, '');

  return (
    <>
      <ControlledInput
        name="currentCTC"
        control={control}
        placeholder="8 LPA"
        label="Current CTC"
        keyboardType="numeric"
        onChangeText={(text) => setValue('currentCTC', removeNonNumeric(text))}
        onBlur={() => setValue('currentCTC', formatToLPA(currentCTC))}
        onFocus={() => setValue('expectedCTC', removeNonNumeric(currentCTC))}
      />
    </>
  );
};
