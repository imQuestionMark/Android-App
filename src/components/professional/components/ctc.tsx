import { Text, View } from 'react-native';

import { ControlledInput } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type CTCProps = ProfessionalControl & {};

export const CTC = ({ control }: CTCProps) => {
  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Current CTC
      </Text>
      <ControlledInput
        name="currentCTC"
        control={control}
        placeholder="8 LPA"
      />
    </View>
  );
};
