import { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { queryClient } from '@/api';
import { useJobs } from '@/api/professional/use-jobs';
import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
import { CustomItem } from '../custom-item';
import { styles } from '../styles';
import { type ProfessionalControl } from '../types';

type RoleProps = ProfessionalControl & {};

export const Role = ({ control }: RoleProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'roles',
    control,
  });

  const data = queryClient.getQueryData(useJobs.getKey());

  const dropdownData = useMemo(() => {
    if (!data || !data.items) return [];
    return data.items;
  }, [data]);

  const placeholderText = () => {
    if (field.value.length) {
      const mappedLabels = field.value.map((id) => getLabel(id));
      return mappedLabels.join(', ');
    } else {
      return 'Select Designation';
    }
  };

  const getLabel = (id: string) => {
    return dropdownData.find((items) => items.id === id)?.label;
  };

  return (
    <View className="mb-5">
      <Typography weight={500} className=" mb-4 text-[16px] ">
        Select Your Role
      </Typography>
      <MultiSelect
        ref={field.ref}
        value={field.value}
        activeColor=""
        labelField="label"
        valueField="id"
        data={dropdownData}
        onChange={field.onChange}
        visibleSelectedItem={false}
        pressableStyle={styles.dropdown}
        placeholder={placeholderText()}
        containerStyle={styles.containerStyles}
        selectedTextProps={{ numberOfLines: 1 }}
        selectedTextStyle={styles.selectedTextStyle}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
        showsVerticalScrollIndicator
      />
      <ErrorMessage error={error} />
    </View>
  );
};
