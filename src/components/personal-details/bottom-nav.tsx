import { View } from 'react-native';

import useBoundStore from '@/lib/store';

import { Button, ButtonText } from '../ui/button';
import Step from '../ui/step';

const BottomNav = ({ onPress }: { onPress?: () => void }) => {
  const onboardingStep = useBoundStore((state) => state.onboardingStep);
  const length = useBoundStore((state) => state.totalSteps);
  console.log('✌️ ~ onboardingStep:', onboardingStep);

  return (
    <View>
      <View className="flex items-end">
        <Button
          size="lg"
          variant="link"
          className="mb-8 px-0"
          onPress={onPress}
        >
          <ButtonText weight={500} className="text-[20px]">
            Confirm
          </ButtonText>
        </Button>
      </View>

      <View className="flex-row justify-between gap-4">
        {Array.from({ length }).map((_, idx) => {
          const isActive = onboardingStep === idx;
          const isCompleted = onboardingStep > idx;
          return <Step key={idx} active={isActive} completed={isCompleted} />;
        })}
      </View>
    </View>
  );
};

export default BottomNav;
