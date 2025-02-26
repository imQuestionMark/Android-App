import { View } from 'react-native';

import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type ExpCTCProps = ProfessionalControl & {};

export const ExpCTC = ({ control }: ExpCTCProps) => {
  return (
    <View className="mb-5">
      <ControlledInput
        control={control}
        name="expectedCTC"
        label="Expected CTC"
        placeholder="18 LPA"
      />
    </View>
  );
};
