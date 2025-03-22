import { View } from 'react-native';

import { ControlledInput, Typography } from '@/components/ui';

import type { ProfileControl } from '../types';

type CTCProps = ProfileControl & {};

export const ProfileCTC = ({ control }: CTCProps) => {
  return (
    <View>
      <Typography weight={500} className="mb-4 text-[14px] text-[#0B0B0B]">
        Current CTC
      </Typography>
      <ControlledInput
        name="currentCTC"
        control={control}
        inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
      />
    </View>
  );
};
