import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { z } from 'zod';

import { ControlledCalendar } from '@/components/onboarding/calendar';
import GradientView from '@/components/onboarding/gradient-view';

const schema = z.object({
  date: z.string(),
});

type TDateofBirth = z.infer<typeof schema>;

const sendDOB = (data: TDateofBirth) => {
  console.log(data);
};

const local_data = [
  {
    value: '1',
    lable: 'United States',
    image: {
      uri: 'https://flagcdn.com/w320/us.png',
    },
  },
  {
    value: '2',
    lable: 'Canada',
    image: {
      uri: 'https://flagcdn.com/w320/ca.png',
    },
  },
  {
    value: '3',
    lable: 'United Kingdom',
    image: {
      uri: 'https://flagcdn.com/w320/gb.png',
    },
  },
  {
    value: '4',
    lable: 'Australia',
    image: {
      uri: 'https://flagcdn.com/w320/au.png',
    },
  },
  {
    value: '5',
    lable: 'Germany',
    image: {
      uri: 'https://flagcdn.com/w320/de.png',
    },
  },
  {
    value: '10',
    lable: 'France',
    image: {
      uri: 'https://flagcdn.com/w320/fr.png',
    },
  },
  {
    value: '20',
    lable: 'Japan',
    image: {
      uri: 'https://flagcdn.com/w320/jp.png',
    },
  },
  {
    value: '30',
    lable: 'Brazil',
    image: {
      uri: 'https://flagcdn.com/w320/br.png',
    },
  },
  {
    value: '40',
    lable: 'India',
    image: {
      uri: 'https://flagcdn.com/w320/in.png',
    },
  },
  {
    value: '50',
    lable: 'China',
    image: {
      uri: 'https://flagcdn.com/w320/cn.png',
    },
  },
];

export default function PersonalDetails() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [country, setCountry] = useState('1');

  const { handleSubmit } = useForm<TDateofBirth>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const toggleCalendar = () => {
    console.log('Calendar state:', !isCalendarVisible);
    return setIsCalendarVisible((p) => !p);
  };

  return (
    <GradientView>
      <View className="m-4 flex grow justify-between">
        <View id="main">
          <View className="flex gap-2">
            <View className="flex-row gap-2">
              <Text className="text-black-500 font-poppins text-[32px] font-bold">
                Hi
              </Text>
              <Text className="font-poppins text-[32px] font-bold text-primary">
                Swetha
              </Text>
            </View>
          </View>

          <View className="mt-6">
            <Text className="  font-poppins text-[20px] font-medium text-[#161616]">
              Enter your D.O.B
            </Text>

            {/* @TODO: Fix max width based on dimensions */}
            <Pressable
              onPress={toggleCalendar}
              className="relative mt-3 max-w-64 flex-row items-center gap-4 rounded-md bg-[#F4F7FF] px-7 py-[10px]"
            >
              <CalendarDays color="#5A5A5A" />
              <Text className="text-[#5A5A5A]">dd/mm/yyyy</Text>
            </Pressable>

            {isCalendarVisible && (
              <Modal
                transparent
                animationType="fade"
                visible={isCalendarVisible}
                onRequestClose={() => setIsCalendarVisible(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setIsCalendarVisible(false)}
                >
                  <View className="max-w-[500px] flex-1 items-center justify-center">
                    <ControlledCalendar />
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            )}
          </View>

          <View className="mt-6">
            <Text className="  font-poppins text-[20px] font-medium text-[#161616]">
              Enter your Nationality
            </Text>

            <View className="mt-3">
              <SelectCountry
                search
                maxHeight={300}
                value={country}
                data={local_data}
                imageField="image"
                labelField="lable"
                valueField="value"
                style={styles.dropdown}
                iconStyle={styles.iconStyle}
                placeholder="Select country"
                searchPlaceholder="Search..."
                imageStyle={styles.imageStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                onChange={(e) => {
                  setCountry(e.value);
                }}
              />
            </View>
          </View>
        </View>

        <View id="bottomNavigation">
          <View className="flex items-end ">
            <Pressable className="mb-6 p-4 " onPress={handleSubmit(sendDOB)}>
              <Link href={{ pathname: '/professional' }}>
                <Text className="font-poppins text-[20px] font-medium text-primary">
                  Confirm
                </Text>
              </Link>
            </Pressable>
          </View>

          <View className="flex-row justify-between gap-4">
            <View className="h-1 grow rounded-xl bg-primary" />
            <View className="h-1 grow rounded-xl bg-[#C9C9C9]" />
          </View>
        </View>
      </View>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    paddingHorizontal: 14,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: 'transparent',
    paddingVertical: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
