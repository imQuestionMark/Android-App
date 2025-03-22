import React from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { locations } from '@/components/profile/account-details/constants';
import { CustomItem } from '@/components/profile/account-details/custom-item';
import { styles } from '@/components/profile/account-details/styles';
import { ErrorMessage, Typography } from '@/components/ui';

import { type ProfileControl } from '../types';

type LocationProps = ProfileControl & {};

export const Locations = ({ control }: LocationProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'location',
    control,
  });

  return (
    <View>
      <Typography weight={500} className="mb-4 text-[14px] text-[#0B0B0B]">
        Location
      </Typography>
      <Dropdown
        value={value}
        activeColor=""
        data={locations}
        labelField="label"
        valueField="value"
        placeholder="Select location"
        placeholderStyle={{
          color: '#5A5A5A',
          fontSize: 14,
          fontWeight: '400',
        }}
        pressableStyle={styles.dropdown}
        containerStyle={styles.containerStyles}
        onChange={(item) => onChange(item.value)}
        selectedTextStyle={styles.selectedTextStyle}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
