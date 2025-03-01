import { View } from 'react-native';

import { ControlledInput, Typography } from '@/components/ui';

import type { ProfessionalControl } from '../types';

type CTCProps = ProfessionalControl & {};

export const CTC = ({ control }: CTCProps) => {
  return (
    <View className="mb-5">
      <Typography weight={500} className="mb-4 text-[16px]">
        Current CTC
      </Typography>
      <ControlledInput
        name="currentCTC"
        control={control}
        placeholder="8 LPA"
      />
    </View>
  );
};
