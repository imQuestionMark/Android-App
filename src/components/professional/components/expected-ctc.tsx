import { View } from 'react-native';

import { ControlledInput, Typography } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type ExpCTCProps = ProfessionalControl & {};

export const ExpCTC = ({ control }: ExpCTCProps) => {
  return (
    <View className="mb-5">
      <Typography weight={500} color="main" className="mb-4 text-[16px]">
        Current CTC
      </Typography>

      <ControlledInput
        control={control}
        name="expectedCTC"
        placeholder="18 LPA"
      />
    </View>
  );
};
