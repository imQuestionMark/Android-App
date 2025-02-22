import React from 'react';
import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { designations } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import { type ProfessionalControl } from '../types';
import { ErrorMessage } from './error-message';

type RoleProps = ProfessionalControl & {};

export const Role = ({ control }: RoleProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name: 'roles',
    control,
  });

  const designationPlaceholder = value.length
    ? value.join(', ')
    : 'Select Designation';

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Select Your Role
      </Text>
      <MultiSelect
        ref={ref}
        value={value}
        activeColor=""
        labelField="label"
        valueField="value"
        data={designations}
        onChange={onChange}
        visibleSelectedItem={false}
        pressableStyle={styles.dropdown}
        placeholder={designationPlaceholder}
        containerStyle={styles.containerStyles}
        selectedTextProps={{ numberOfLines: 1 }}
        selectedTextStyle={styles.selectedTextStyle}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
