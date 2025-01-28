import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Svg, { Path } from 'react-native-svg';

import GradientView from '@/components/onboarding/gradient-view';
import { View } from '@/components/ui';
import { Radio, Switch } from '@/components/ui';

type TDesignation = {
  label: string;
  value: number;
};

const Professional = () => {
  const [selectedDesignation, setSelectedDesignation] =
    useState<TDesignation | null>(null);
  // const [selectedExperience, setSelectedExperience] = useState(['']);
  // const [selectedLocation, setSelectedLocation] = useState<string[]>([]);

  const designations = [
    { label: 'UX UI Designer', value: 'UX UI Designer' },
    { label: 'UX Writer', value: 'UX Writer' },
    { label: 'UI Designer', value: 'UI Designer' },
    { label: 'UX Researcher', value: 'UX Researcher' },
  ];

  // const experience = [
  //   { label: '1', value: 1 },
  //   { label: '2', value: 2 },
  //   { label: '3', value: 3 },
  // ];

  // const locations = [
  //   { label: 'Chennai', value: 'Chennai' },
  //   { label: 'Bangalore', value: 'Bangalore' },
  // ];

  const handleChange = (data: TDesignation) => {
    console.log('Handle Change firing');
    console.log(data);
    setSelectedDesignation(data);
  };

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
            activeColor=""
            closeModalWhenSelectedItem={false}
            onChange={handleChange}
            renderItem={(data, selected) => {
              return (
                <View className="flex-row items-center gap-3 p-4">
                  <View
                    className={`rounded-xl border-[3px]  ${selected ? ' border-[#17A2B8] bg-primary' : 'border-gray-300 bg-white'}`}
                  >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <Path
                        d="m16.726 7-.64.633c-2.207 2.212-3.878 4.047-5.955 6.158l-2.28-1.928-.69-.584L6 12.66l.683.577 2.928 2.477.633.535.591-.584c2.421-2.426 4.148-4.367 6.532-6.756l.633-.64L16.726 7Z"
                        fill={selected ? '#fff' : 'none'}
                      />
                    </Svg>
                  </View>

                  <Text className={`${selected ? 'text-primary' : ''}`}>
                    {data.label}
                  </Text>
                </View>
              );
            }}
          />

          {/* <View>
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
              onChange={(item) => setSelectedExperience(item.value)}
            />
          </View>

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
                return (
                  <>
                    <Text>{data.label}</Text>
                  </>
                );
              }}
              onChange={(item) => setSelectedLocation(item)}
            />
          </View> */}

          <View>
            <RadioExample />
            <SwitchExample />
          </View>
        </View>
      </View>
    </GradientView>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = useState(false);
  return (
    <Radio.Root
      checked={selected}
      onChange={setSelected}
      accessibilityLabel="radio button"
      className="pb-2"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = useState(false);
  return (
    <Switch.Root
      checked={active}
      onChange={setActive}
      accessibilityLabel="switch"
      className="pb-2"
    >
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
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
