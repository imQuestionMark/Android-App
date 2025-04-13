import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { queryClient } from '@/api';
import { useJobs } from '@/api/professional/use-roles.query';
import { Button, ButtonText, Input, Typography } from '@/components/ui';

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
  const [query, setQuery] = useState<string>('');

  const data = queryClient.getQueryData(useJobs.getKey());

  const handleOptimisticUpdate = () => {
    const currentData = queryClient.getQueryData(useJobs.getKey());
    if (query) {
      const newData = [
        { id: query, label: query },
        ...(currentData?.items || []),
      ];

      queryClient.setQueryData(useJobs.getKey(), { items: newData });
    }
    resetSearch();
  };

  const dropdownData = useMemo(() => {
    if (!data || !data.items) return [];
    return data.items;
  }, [data]);

  const resetSearch = () => setQuery('');

  const getLabel = (id: string) => {
    return dropdownData.find((items) => items.id === id)?.label;
  };

  const placeholderText = () => {
    if (field.value.length) {
      const mappedLabels = field.value.map(getLabel);
      return mappedLabels.join(', ');
    } else {
      return 'Select Designation';
    }
  };

  return (
    <View>
      <Typography weight={500} color="main" className="mb-4 text-[16px] ">
        Select Your Role
      </Typography>
      <MultiSelect
        testID="role-dropdown"
        ref={field.ref}
        value={field.value}
        activeColor=""
        labelField="label"
        valueField="id"
        search
        searchPlaceholder="Type to add new or filter existing roles"
        flatListProps={{
          ListEmptyComponent: () => {
            return (
              <>
                {query.trim() && (
                  <View className="items-start">
                    <Button
                      className=""
                      variant="ghost"
                      onPress={() => {
                        handleOptimisticUpdate();
                      }}
                      testID="add-new-role-button"
                    >
                      <ButtonText>{query} ( Add New )</ButtonText>
                    </Button>
                  </View>
                )}

                <View className="items-center p-4">
                  <Ionicons name="file-tray-outline" size={40} color="black" />
                  <Typography>No Data found</Typography>
                </View>
              </>
            );
          },
        }}
        data={dropdownData}
        onChange={field.onChange}
        renderInputSearch={(onSearch) => {
          return (
            <Input
              value={query}
              inputClassName="border m-4"
              placeholder="Search Placeholder"
              onChangeText={(e) => {
                onSearch(e);
                setQuery(e);
              }}
              testID="role-search"
            />
          );
        }}
        visibleSelectedItem={false}
        pressableStyle={styles.dropdown}
        placeholder={placeholderText()}
        containerStyle={styles.containerStyles}
        selectedTextProps={{ numberOfLines: 1 }}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={
          field.value.length > 0 ? styles.selectedText : styles.placeholder
        }
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
        showsVerticalScrollIndicator
      />
      <ErrorMessage error={error} />
    </View>
  );
};
