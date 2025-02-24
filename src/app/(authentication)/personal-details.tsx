import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { z } from 'zod';

import { ControlledCalendar } from '@/components/onboarding/calendar';
import GradientView from '@/components/onboarding/gradient-view';
import { Nationality } from '@/components/personal-details/nationality';

const personalDetailsSchema = z.object({
  nationality: z.string(),
  address: z.string(),
  DOB: z.string(),
  gender: z.enum(['M', 'F']),
});

export type PersonalDetailsProps = z.infer<typeof personalDetailsSchema>;

type TDateofBirth = z.infer<typeof personalDetailsSchema>;

export default function PersonalDetails() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const { control } = useForm<TDateofBirth>({
    defaultValues: {
      nationality: '',
    },
    resolver: zodResolver(personalDetailsSchema),
  });

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => setShowCalendarModal(false);

  return (
    <GradientView>
      <View className="m-4 flex grow justify-between">
        <View id="main">
          <View>
            <View className="flex-row gap-x-2">
              <Text className="font-poppins-semibold text-[32px] leading-[48px] text-[#161616]">
                Hi
              </Text>
              <Text className="font-poppins-semibold text-[32px] leading-[48px] text-primary">
                Swetha
              </Text>
            </View>

            <Text className="font-poppins-medium text-[20px]  text-[#5A5A5A]">
              Enter Details
            </Text>
          </View>

          <View className="mt-6">
            <Text className="font-poppins-medium text-[20px] leading-6 text-[#161616]">
              Enter Your D.O.B
            </Text>

            {/* @TODO: Fix max width based on dimensions */}
            <Pressable
              onPress={toggleCalendarModal}
              className="relative mt-3 max-w-64 flex-row items-center gap-4 rounded-md bg-[#F4F7FF] px-7 "
            >
              <CalendarDays color="#5A5A5A" />
              <Text className="py-[10px] font-poppins-medium text-[12px] leading-[16px] text-[#5A5A5A]">
                dd/mm/yyyy
              </Text>
            </Pressable>

            <Modal
              transparent
              animationType="fade"
              visible={showCalendarModal}
              onRequestClose={hideCalendarModal}
            >
              <TouchableWithoutFeedback onPress={hideCalendarModal}>
                {/* mb-[150px] */}
                <View className="max-w-[500px] flex-1 items-center justify-center">
                  <ControlledCalendar control={control} />
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          <View className="mt-6">
            <Text className="  font-poppins-medium text-[20px] font-medium text-[#161616]">
              Enter your Nationality
            </Text>
          </View>

          <Nationality control={control} />
        </View>

        <View id="bottomNavigation">
          <View className="flex items-end ">
            <Pressable onPress={() => {}} className="mb-6 p-4 ">
              <Link href={{ pathname: '/' }}>
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
