import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
import { experience } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import { type ProfessionalControl } from '../types';

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
    <View>
      <Typography weight={500} color="main" className="mb-4 text-[16px]">
        Experience
      </Typography>
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
        placeholderStyle={
          value.length > 0 ? styles.selectedText : styles.placeholder
        }
        selectedTextStyle={styles.selectedTextStyle}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
