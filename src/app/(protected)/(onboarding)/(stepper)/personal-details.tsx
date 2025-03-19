import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native';

import {
  type PersonalDetailsProps,
  personalDetailsSchema,
} from '@/api/authentication/personal-details';
import { ControlledCalendar } from '@/components/onboarding/calendar';
import { Nationality } from '@/components/personal-details/nationality';
import { Typography } from '@/components/ui';
import useBoundStore from '@/lib/store/index';
import { usePersonalStore } from '@/lib/store/personal-details';
import { useUserStore } from '@/lib/store/user-store';
import { devLog } from '@/lib/utils';

const DEFAULT_VALUES = {
  nationality: '4',
  DOB: '2002-05-03',
};

export default function PersonalDetails() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<PersonalDetailsProps>({
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(personalDetailsSchema),
  });

  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const dob = usePersonalStore((state) => state.dob);
  const firstName = useUserStore((state) => state.firstName);

  const incrementOnboarding = useBoundStore((s) => s.incrementOnboarding);
  const updateOnboarding = useBoundStore((s) => s.updateOnboarding);
  const setHandler = useBoundStore((state) => state.setHandler);
  const resetHandler = useBoundStore((state) => state.resetHandler);

  const toggleCalendarModal = () => setShowCalendarModal((p) => !p);
  const hideCalendarModal = () => setShowCalendarModal(false);

  const handleConfirm = useCallback(() => {
    handleSubmit(
      (data) => {
        devLog('Form data valid:', data);
        incrementOnboarding();
        router.push({ pathname: '/professional-details' });
      },
      (errors) => {
        console.error(
          'Form validation errors:',
          JSON.stringify(errors, null, 2)
        );
      }
    )();
  }, [handleSubmit, router, incrementOnboarding]);

  useEffect(() => {
    setHandler(handleConfirm);

    return () => resetHandler();
  }, [handleConfirm, resetHandler, setHandler, updateOnboarding]);

  return (
    <View className="flex grow justify-between">
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
              {firstName}
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
            <Ionicons name="calendar-outline" size={18} color="#5A5A5A" />
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
    </View>
  );
}
