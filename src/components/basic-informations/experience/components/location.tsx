import React from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { CustomItem } from '@/components/basic-informations/basic-info/custom-item';
import { styles } from '@/components/basic-informations/basic-info/styles';
import { locations } from '@/components/professional/constants';
import { ErrorMessage, Typography } from '@/components/ui';

import { type ExperienceInfoControl } from '../types';

type LocationProps = ExperienceInfoControl & {};

export const Locations = ({ control }: LocationProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'locations',
    control,
  });

  return (
    <View className="mb-5">
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
