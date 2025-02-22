import { useController } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { experience } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import { type ProfessionalControl } from '../types';
import { ErrorMessage } from './error-message';

type ExperienceProps = ProfessionalControl & {};

export const Experience = ({ control }: ExperienceProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'experience',
    control,
  });

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Experience
      </Text>
      <Dropdown
        value={value}
        activeColor=""
        data={experience}
        labelField="label"
        valueField="value"
        placeholder="Select Experience"
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
