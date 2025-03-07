import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type CTCProps = ProfessionalControl & {};

export const CTC = ({ control }: CTCProps) => {
  return (
    <>
      <ControlledInput
        name="currentCTC"
        control={control}
        placeholder="8 LPA"
        label="Current CTC"
      />
    </>
  );
};
