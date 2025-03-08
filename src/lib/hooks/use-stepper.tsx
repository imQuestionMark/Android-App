import { useState } from 'react';

type StepperProps = {
  initialStep?: number;
  totalSteps: number;
};

export const useStepper = ({ initialStep = 0, totalSteps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNext = () => {
    console.log('GoToNext');
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    console.log('GoToPrev');
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isFirstStep = currentStep === initialStep;
  const isLastStep = currentStep === totalSteps - 1;

  return { currentStep, goToNext, goToPrevious, isFirstStep, isLastStep };
};
