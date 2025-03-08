import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { CalendarDays } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { z } from 'zod';

import { ControlledCalendar } from '@/components/onboarding/calendar';
import GradientView from '@/components/onboarding/gradient-view';
import BottomNav from '@/components/personal-details/bottom-nav';
import { Nationality } from '@/components/personal-details/nationality';
import { Typography } from '@/components/ui';
import { useOnboardingStore } from '@/lib/store/onboarding';
import { usePersonalStore } from '@/lib/store/personal-details';
import { useUserStore } from '@/lib/store/user-store';

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
  const preUserData = useUserStore();

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
              <Typography
                weight={600}
                color="main"
                className="text-[32px] leading-[48px] "
              >
                Hi
              </Typography>
              <Typography
                weight={600}
                color="primary"
                className="text-[32px] leading-[48px]"
              >
                {preUserData.firstName}
              </Typography>
            </View>

            <Typography weight={500} color="body" className="text-[20px]">
              Enter Details
            </Typography>
          </View>

          <View className="mt-6">
            <Typography
              weight={500}
              color="main"
              className=" text-[20px] leading-[24px]"
            >
              Enter Your D.O.B
            </Typography>

            {/* @TODO: Fix max width based on dimensions */}
            <Pressable
              onPress={toggleCalendarModal}
              className="mt-3 max-w-64 flex-row items-center gap-4 rounded-md bg-white px-7 "
            >
              <CalendarDays color="#5A5A5A" />
              <Typography
                weight={400}
                color="body"
                className=" py-[10px] text-[16px]"
              >
                {dob || 'dd/mm/yyyy'}
              </Typography>
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
            <Typography weight={500} color="main" className=" text-[20px] ">
              Enter your Nationality
            </Typography>
          </View>

          <Nationality control={control} />
        </View>

        <BottomNav onPress={goToNext} />
      </View>
    </GradientView>
  );
}
