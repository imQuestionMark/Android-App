import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
import { designations } from '../constants';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import { type ProfessionalControl } from '../types';

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
    <View>
      <Typography weight={500} color="main" className="mb-4 text-[16px] ">
        Select Your Role
      </Typography>
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
        placeholderStyle={styles.placeholder}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
