import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { locations } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import type { ProfessionalControl } from '../types';
import { ErrorMessage } from './error-message';

type LocationProps = ProfessionalControl & {};

export const Location = ({ control }: LocationProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'locations',
    control,
  });

  const locationPlaceholder = value.length
    ? value.join(', ')
    : 'Select Location';

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Preferred Location
      </Text>
      <MultiSelect
        value={value}
        activeColor=""
        data={locations}
        labelField="label"
        valueField="value"
        onChange={onChange}
        visibleSelectedItem={false}
        pressableStyle={styles.dropdown}
        placeholder={locationPlaceholder}
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
