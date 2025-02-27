import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
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
import BottomNav from '@/components/personal-details/bottom-nav';
import { Nationality } from '@/components/personal-details/nationality';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { usePersonalStore } from '@/lib/store/personal-details';

const personalDetailsSchema = z.object({
  nationality: z.string({ required_error: 'Nationality must be selected' }),
  DOB: z
    .string({ required_error: 'Date of Birth is required' })
    .date('Invalid Date received'),
  // address: z.string(),
  // gender: z.enum(['M', 'F']),
});

export type PersonalDetailsProps = z.infer<typeof personalDetailsSchema>;

type TDateofBirth = z.infer<typeof personalDetailsSchema>;

export default function PersonalDetails() {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const { updateCurrentPage, updateStatus } = useOnboardingStore();
  const { dob } = usePersonalStore();

  const { control, handleSubmit } = useForm<TDateofBirth>({
    // defaultValues: {
    //   DOB: dob,
    //   nationality: '',
    // },
    shouldFocusError: false,
    resolver: zodResolver(personalDetailsSchema),
  });

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => setShowCalendarModal(false);

  const goToNext = () => {
    console.log('Confirm clicked');
    handleSubmit(
      (data) => {
        console.log('Form data valid:', data);
        updateCurrentPage(1);
        updateStatus('pending');
        router.push({ pathname: '/(authentication)/professional' });
      },
      (errors) => {
        console.error(
          'Form validation errors:',
          JSON.stringify(errors, null, 2)
        );
      }
    )();
    // submit to API. onSuccess callback --> updateCurrentPage(1) --> router.push('/profressional)
  };

  return (
    <GradientView>
      <View className="m-4 flex grow justify-between">
        <View id="main">
          <View>
            <View className="flex-row gap-x-2">
              <Text className="font-poppins-semibold text-[32px] leading-[48px] text-main">
                Hi
              </Text>
              <Text className="font-poppins-semibold text-[32px] leading-[48px] text-primary">
                Swetha
              </Text>
            </View>

            <Text className="font-poppins-medium text-[20px]  text-body">
              Enter Details
            </Text>
          </View>

          <View className="mt-6">
            <Text className="font-poppins-medium text-[20px] leading-6 text-main">
              Enter Your D.O.B
            </Text>

            {/* @TODO: Fix max width based on dimensions */}
            <Pressable
              onPress={toggleCalendarModal}
              className="relative mt-3 max-w-64 flex-row items-center gap-4 rounded-md bg-white px-7 "
            >
              <CalendarDays color="#5A5A5A" />
              <Text className="py-[10px] font-poppins text-[16px] text-black">
                {dob || 'dd/mm/yyyy'}
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
                  <ControlledCalendar
                    control={control}
                    hideCalendarModal={hideCalendarModal}
                  />
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>

          <View className="mt-6">
            <Text className="  font-poppins-medium text-[20px] font-medium text-main">
              Enter your Nationality
            </Text>
          </View>

          <Nationality control={control} />
        </View>

        <BottomNav onPress={goToNext} />
      </View>
    </GradientView>
  );
}
