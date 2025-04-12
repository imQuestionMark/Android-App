import { type UseFormSetValue, useWatch } from 'react-hook-form';

import { type ProfessionalFormData } from '@/api/authentication/professional-details';
import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type ExpCTCProps = ProfessionalControl & {
  setValue: UseFormSetValue<ProfessionalFormData>;
};

export const ExpCTC = ({ control, setValue }: ExpCTCProps) => {
  const expectedCTC = useWatch({ control, name: 'expectedCTC' }) || '';

  const formatToLPA = (value: string) => (value ? `${value} LPA` : '');
  const removeNonNumeric = (value: string) => value.replace(/\D/g, '');

  return (
    <>
      <ControlledInput
        control={control}
        name="expectedCTC"
        placeholder="18 LPA"
        label="Expected CTC"
        keyboardType="numeric"
        onChangeText={(text) => setValue('expectedCTC', removeNonNumeric(text))}
        onBlur={() => setValue('expectedCTC', formatToLPA(expectedCTC))}
        onFocus={() => setValue('expectedCTC', removeNonNumeric(expectedCTC))}
      />
    </>
  );
};
