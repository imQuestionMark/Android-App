import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
import { mode } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import type { ProfessionalControl } from '../types';

type MoWProps = ProfessionalControl & {};

export const ModeOfWork = ({ control }: MoWProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'workModes',
    control,
  });

  const ModePlaceholder = value.length ? value.join(', ') : 'Select Mode';

  return (
    <View className="mb-5">
      <Typography weight={500} color='main' className="mb-4  text-[16px]">
        Preferred(Mode of work)
      </Typography>
      <MultiSelect
        data={mode}
        value={value}
        activeColor=""
        labelField="label"
        valueField="value"
        onChange={onChange}
        visibleSelectedItem={false}
        placeholder={ModePlaceholder}
        pressableStyle={styles.dropdown}
        containerStyle={styles.containerStyles}
        selectedTextProps={{ numberOfLines: 1 }}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholder}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
