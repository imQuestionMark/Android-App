import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { Text } from '@/components/ui';
import { ControlledCalendar } from '@/components/ui/calendars';

const schema = z.object({
  date: z.string(),
});

type TDateofBirth = z.infer<typeof schema>;

const sendDOB = (data: TDateofBirth) => {
  console.log(data);
};

export default function PersonalDetails() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { control, handleSubmit } = useForm<TDateofBirth>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const toggleCalendar = () => {
    console.log('Calendar state:', !isCalendarVisible);
    return setIsCalendarVisible((p) => !p);
  };

  return (
    <GradientView className="m-5">
      <View className="mt-4 flex grow justify-between">
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
            <View>
              <Text className="font-poppins text-[20px] font-medium text-[#161616]">
                Enter details
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
              className="mt-[22px] max-w-64 flex-row items-center gap-4 rounded-md bg-[#F4F7FF] px-7 py-[10px]"
            >
              <CalendarDays color="#5A5A5A" />
              <Text className="text-[#5A5A5A]">dd/mm/yyyy</Text>
            </Pressable>

            {isCalendarVisible && (
              <ControlledCalendar name="date" control={control} />
            )}
          </View>

          <View className="mt-6">
            <Text className="  font-poppins text-[20px] font-medium text-[#161616]">
              Enter your Nationality
            </Text>

            <Pressable className="mt-[22px] flex-row items-center gap-4 rounded-md bg-[#F4F7FF] px-7 py-[10px]">
              <Text className="text-[#5A5A5A]">Select box T.B.D</Text>
            </Pressable>
          </View>
        </View>

        <View id="bottomNavigation">
          <View className="flex items-end">
            <Pressable className="mb-6 p-4" onPress={handleSubmit(sendDOB)}>
              <Text className="font-poppins text-[20px] font-medium text-primary">
                Confirm
              </Text>
            </Pressable>
          </View>

          <View id="StatusBar" className="flex-row justify-between gap-4">
            <View className="h-1 grow rounded-xl bg-primary" />
            <View className="h-1 grow rounded-xl bg-[#C9C9C9]" />
          </View>
        </View>
      </View>
    </GradientView>
  );
}
