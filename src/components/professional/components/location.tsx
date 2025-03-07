import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
import { locations } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import type { ProfessionalControl } from '../types';

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
    <View>
      <Typography weight={500} color="main" className="mb-4 text-[16px] ">
        Preferred Location
      </Typography>
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
        placeholderStyle={
          value.length > 0 ? styles.selectedText : styles.placeholder
        }
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
