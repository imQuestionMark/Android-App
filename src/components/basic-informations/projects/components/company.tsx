import React from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { CustomItem } from '@/components/basic-informations/basic-info/custom-item';
import { styles } from '@/components/basic-informations/basic-info/styles';
import { ErrorMessage, Typography } from '@/components/ui';

import { company } from '../constants';
import { type ProjectInfoControl } from '../types';

type CompanyProps = ProjectInfoControl & {};

export const Company = ({ control }: CompanyProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'companyName',
    control,
  });

  return (
    <View className="mb-5">
      <Typography weight={500} className="mb-4 text-[14px] text-[#0B0B0B]">
        Company Name
      </Typography>
      <Dropdown
        value={value}
        activeColor=""
        data={company}
        labelField="label"
        valueField="value"
        placeholder="Select Company Name"
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
