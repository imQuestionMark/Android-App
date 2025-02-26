import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { mode } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import type { ProfessionalControl } from '../types';
import { ErrorMessage } from './error-message';

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
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Preferred(Mode of work)
      </Text>
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
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
