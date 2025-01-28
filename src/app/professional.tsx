import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

import GradientView from '@/components/onboarding/gradient-view';

const Professional = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const experience = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];

  const designations = [
    { label: 'UXUI designer', value: 'UXUI designer' },
    { label: 'UX writer', value: 'UX writer' },
    { label: 'UI designer', value: 'UI designer' },
    { label: 'UX researcher', value: 'UX researcher' },
  ];

  const locations = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Bangalore', value: 'Bangalore' },
  ];

  return (
    <GradientView>
      <View className="m-6">
        <Text className="font-poppins text-2xl font-semibold">
          Job preference
        </Text>

        <View className="mt-6">
          <Text className="mb-4 font-poppins text-[16px] font-medium">
            Select Your Role
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={designations}
            labelField="label"
            valueField="value"
            placeholder="Select Designation"
            value={selectedDesignation}
            onChange={(item) => setSelectedDesignation(item.value)}
          />

          <Text className="mb-4 font-poppins text-[16px] font-medium">
            Experience
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={experience}
            labelField="label"
            valueField="value"
            placeholder="Select Experience"
            value={selectedExperience}
            renderItem={(data) => {
              console.log(data);
              return (
                <>
                  <Text>{data.label} year</Text>
                </>
              );
            }}
            onChange={(item) => setSelectedExperience(item.value)}
          />

          <View>
            <Text className="mb-4 font-poppins text-[16px] font-medium">
              Preferred Location
            </Text>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={locations}
              labelField="label"
              valueField="value"
              placeholder="Select Location"
              value={selectedLocation}
              renderItem={(data) => {
                console.log(data);
                return (
                  <>
                    <Text>{data.label}</Text>
                  </>
                );
              }}
              onChange={(item) => setSelectedLocation(item)}
            />
          </View>
        </View>
      </View>
    </GradientView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default Professional;
