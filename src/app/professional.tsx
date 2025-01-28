import { remapProps } from 'nativewind';
import { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
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
remapProps(MultiSelect, {
  className: 'style',
  selectedTextClassname: 'selectedTextStyle',
});

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
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
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
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        data={experience}
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
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        data={locations}
        labelField="label"
        valueField="value"
        placeholder={locationPlaceholder}
        value={selectedLocation}
        onChange={handleLocationChange}
        activeColor={undefined}
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
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="m16.726 7-.64.633c-2.207 2.212-3.878 4.047-5.955 6.158l-2.28-1.928-.69-.584L6 12.66l.683.577 2.928 2.477.633.535.591-.584c2.421-2.426 4.148-4.367 6.532-6.756l.633-.64L16.726 7Z"
              fill={itemIconCheck({ selected })}
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
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default Professional;
