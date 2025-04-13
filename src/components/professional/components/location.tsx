import { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { queryClient } from '@/api';
import { useLocationsQuery } from '@/api/professional/use-locations.query';
import { Typography } from '@/components/ui';

import { ErrorMessage } from '../../ui/error-message';
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

  const data = queryClient.getQueryData(useLocationsQuery.getKey());

  const dropdownData = useMemo(() => {
    if (!data || !data.items) return [];
    return data.items;
  }, [data]);

  const placeholderText = () => {
    if (value.length) {
      const mappedLabels = value.map((id) => getLabel(id));
      return mappedLabels.join(', ');
    } else {
      return 'Select Designation';
    }
  };

  const getLabel = (id: string) => {
    return dropdownData.find((items) => items.id === id)?.label;
  };

  return (
    <View>
      <Typography weight={500} color="main" className="mb-4 text-[16px] ">
        Preferred Location
      </Typography>
      <MultiSelect
        value={value}
        activeColor=""
        labelField="label"
        valueField="id"
        data={dropdownData}
        onChange={onChange}
        visibleSelectedItem={false}
        pressableStyle={styles.dropdown}
        placeholder={placeholderText()}
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
