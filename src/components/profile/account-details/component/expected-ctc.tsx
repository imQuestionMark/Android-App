import { View } from 'react-native';

import { ControlledInput } from '@/components/ui';

import type { ProfileControl } from '../types';

type ExpCTCProps = ProfileControl & {};

export const ProfileExpCTC = ({ control }: ExpCTCProps) => {
  return (
    <View>
      <ControlledInput
        control={control}
        name="expectedCTC"
        label="Expected CTC"
        labelClassName="text-[14px] text-[#0B0B0B]"
        inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
      />
    </View>
  );
};
