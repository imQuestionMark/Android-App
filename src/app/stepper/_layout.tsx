import { Slot, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { _renderArrows } from '@/components/onboarding/calendar/arrows';
import { Typography } from '@/components/ui';
import Step from '@/components/ui/step';
import { useStepper } from '@/lib/hooks/use-stepper';

// Define step routes as const for type safety
const STEP_ROUTES = {
  0: '/stepper/one',
  1: '/stepper/two',
  2: '/stepper/three',
  3: '/stepper/four',
  4: '/stepper/five',
  5: '/stepper/six',
} as const;

type StepKeys = keyof typeof STEP_ROUTES;

const TOTAL_STEPS = Object.keys(STEP_ROUTES).length;

export default function StepperLayout() {
  const [selected, setSelected] = useState('');

  const router = useRouter();
  const { goToNext, goToPrevious, isFirstStep, isLastStep, currentStep } =
    useStepper({
      totalSteps: TOTAL_STEPS,
    });

  const handleNext = () => {
    goToNext();
    const nextRoute = STEP_ROUTES[(currentStep + 1) as StepKeys];
    router.push(nextRoute);
  };

  const handlePrevious = () => {
    goToPrevious();
    router.back();
  };

  const vacation = {
    key: 'vacation',
    color: 'black',
    selectedDotColor: 'black',
  };
  const massage = {
    key: 'massage',
    color: 'yellow',
    selectedDotColor: 'yellow',
  };
  const workout = { key: 'workout', color: 'green' };

  return (
    <SafeAreaView className="grow bg-yellow-600">
      <View className="px-4">
        <StepperHeader
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />

        <Slot />
        <RNCalendar
          hideExtraDays
          enableSwipeMonths
          onDayPress={(day) => {
            console.log('OnDayPress:', day);
            setSelected(day.dateString);
          }}
          current="2002-05-03"
          markingType="multi-dot"
          markedDates={{
            [selected]: {
              selected: true,
              selectedColor: 'blue',
              marked: true,
              dotColor: 'red',
              activeOpacity: 0,
              dots: [vacation, massage, workout],
            },
          }}
          style={{ borderRadius: 6, backgroundColor: 'pink' }}
          // dayComponent={(data) => _renderDay(data)}
          // customHeaderTitle={<Typography>Hello world</Typography>}
          renderArrow={(direction: string) => _renderArrows(direction)}
        />
      </View>
    </SafeAreaView>
  );
}

interface StepperHeaderProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  totalSteps: number;
}

const StepperHeader = React.memo(function StepperHeader({
  isFirstStep,
  isLastStep,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: StepperHeaderProps) {
  return (
    <>
      <View className="mt-4 flex-row justify-between">
        <Button title="Previous" onPress={onPrevious} disabled={isFirstStep} />

        <Button title="Next" onPress={onNext} disabled={isLastStep} />
      </View>

      <View className="mt-4 flex-row gap-1">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <Step key={idx} active={currentStep >= idx} />
        ))}
      </View>
    </>
  );
});
