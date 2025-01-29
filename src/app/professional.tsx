import { useCallback, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import GradientView from '@/components/onboarding/gradient-view';
import { View } from '@/components/ui';

type TDropdownData = {
  label: string;
  value: number;
};

const designations = [
  { label: 'UX UI Designer', value: 'UX UI Designer' },
  { label: 'UX Writer', value: 'UX Writer' },
  { label: 'UI Designer', value: 'UI Designer' },
  { label: 'UX Researcher', value: 'UX Researcher' },
];

const experience = [
  { label: '1 Year', value: 1 },
  { label: '2 Years', value: 2 },
  { label: '3 Years', value: 3 },
];

const locations = [
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Bangalore', value: 'Bangalore' },
];

const dropdownStyles = tv({
  slots: {
    trigger: 'h-[50px] rounded-lg border border-white bg-white px-2',
    triggerText: 'text-base text-black',
    itemContainer: 'flex-row items-center gap-3 p-4',
    itemIcon: 'rounded-xl border-[3px] border-gray-300 bg-white',
    itemIconCheck: '',
    itemText: 'text-black',
  },
  variants: {
    selected: {
      true: {
        itemIcon: 'border-[#17A2B8] bg-primary',
        itemIconCheck: 'white',
        itemText: 'text-primary',
      },
      false: {
        itemIconCheck: 'none',
      },
    },
  },
});

// @TODO Figure out how to remap props for MultiSelect
// remapProps(MultiSelect, {
//   className: 'style',
//   selectedTextClassname: 'selectedTextStyle',
// });

const { itemIcon, itemContainer, itemText, itemIconCheck } = dropdownStyles();

const Professional = () => {
  return (
    <GradientView>
      <View className="m-6">
        <Text className="font-poppins text-2xl font-semibold">
          Job preference
        </Text>

        <View className="mt-6">
          <Role />
          <Experience />
          <Location />
        </View>
      </View>
    </GradientView>
  );
};

const Role = () => {
  const [selectedDesignation, setSelectedDesignation] = useState<string[]>([]);

  const handleRoleChange = useCallback((data: string[]) => {
    setSelectedDesignation(data);
  }, []);

  const flattenedDesignation = selectedDesignation.join(', ');
  const designationPlaceholder = selectedDesignation.length
    ? flattenedDesignation
    : 'Select Designation';
  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Select Your Role
      </Text>
      <MultiSelect
        pressableStyle={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{
          borderRadius: 8,
          marginTop: Platform.OS === 'ios' ? -96 : 4,
        }}
        data={designations}
        labelField="label"
        valueField="value"
        placeholder={designationPlaceholder}
        value={selectedDesignation}
        activeColor=""
        visibleSelectedItem={false}
        selectedTextProps={{ numberOfLines: 1 }}
        onChange={handleRoleChange}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
    </View>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<TDropdownData | null>(null);

  const handleExperienceChange = useCallback((data: TDropdownData) => {
    setSelectedExperience(data);
  }, []);
  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Experience
      </Text>
      <Dropdown
        pressableStyle={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        data={experience}
        containerStyle={{
          borderRadius: 8,
          marginTop: Platform.OS === 'ios' ? -96 : 4,
        }}
        labelField="label"
        valueField="value"
        placeholder="Select Experience"
        value={selectedExperience}
        activeColor=""
        onChange={(item) => handleExperienceChange(item.value)}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
    </View>
  );
};

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const handleLocationChange = useCallback((data: string[]) => {
    setSelectedLocation(data);
  }, []);

  const flattenedLocation = selectedLocation.join(', ');
  const locationPlaceholder = selectedLocation.length
    ? flattenedLocation
    : 'Select Location';

  return (
    <View className="mb-5">
      <Text className="mb-4 font-poppins text-[16px] font-medium">
        Preferred Location
      </Text>
      <MultiSelect
        pressableStyle={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        data={locations}
        containerStyle={{
          borderRadius: 8,
          marginTop: Platform.OS === 'ios' ? -96 : 4,
        }}
        labelField="label"
        valueField="value"
        placeholder={locationPlaceholder}
        value={selectedLocation}
        onChange={handleLocationChange}
        activeColor=""
        visibleSelectedItem={false}
        selectedTextProps={{ numberOfLines: 1 }}
        renderItem={(data, selected) => (
          <CustomItem data={data} selected={selected} />
        )}
      />
    </View>
  );
};

const CustomItem = ({ data, selected }: { data: any; selected?: boolean }) => {
  {
    return (
      <View className={itemContainer()}>
        <View className={itemIcon({ selected })}>
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
              d="M6 11L9 13L14.5 7"
              strokeWidth="2.01011"
              stroke={itemIconCheck({ selected })}
            />
          </Svg>
        </View>

        <Text className={itemText({ selected })}>{data.label}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    borderWidth: 0,
  },
});

export default Professional;
