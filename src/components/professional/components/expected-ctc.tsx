import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type ExpCTCProps = ProfessionalControl & {};

export const ExpCTC = ({ control }: ExpCTCProps) => {
  return (
    <>
      <ControlledInput
        control={control}
        name="expectedCTC"
        placeholder="18 LPA"
        label="Expected CTC"
      />
    </>
  );
};
