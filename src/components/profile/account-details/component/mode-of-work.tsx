import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../../ui/error-message';
import { mode } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import type { ProfileControl } from '../types';

type MoWProps = ProfileControl & {};

export const ProfileModeOfWork = ({ control }: MoWProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: 'workModes',
    control,
  });

  const ModePlaceholder = value.length
    ? value.join(', ')
    : 'Select Preferred Modes';

  return (
    <View>
      <Typography weight={500} className="mb-4 text-[14px] text-[#0B0B0B]">
        Preferred(Mode of work)
      </Typography>
      <MultiSelect
        data={mode}
        value={value}
        activeColor=""
        labelField="label"
        valueField="value"
        onChange={onChange}
        placeholder={ModePlaceholder}
        visibleSelectedItem={false}
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
