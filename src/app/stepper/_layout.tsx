import { Slot, useRouter } from 'expo-router';
import { Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Step from '@/components/ui/step';
import { useStepper } from '@/lib/hooks/use-stepper';
import React from 'react';

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
type StepRoutes = (typeof STEP_ROUTES)[StepKeys];

const TOTAL_STEPS = Object.keys(STEP_ROUTES).length;

export default function StepperLayout() {
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

  return (
    <SafeAreaView className="bg-white grow">
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
      </View>
    </SafeAreaView>
  );
}

interface StepperHeaderProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
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
