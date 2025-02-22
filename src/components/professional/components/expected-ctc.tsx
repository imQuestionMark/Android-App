import { Text, View } from 'react-native';

import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type ExpCTCProps = ProfessionalControl & {};

export const ExpCTC = ({ control }: ExpCTCProps) => {
  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Expected CTC
      </Text>
      <ControlledInput
        control={control}
        name="expectedCTC"
        placeholder="18 LPA"
      />
    </View>
  );
};
