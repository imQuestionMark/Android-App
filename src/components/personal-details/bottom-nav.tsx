import { View } from 'react-native';

import { useOnboardingStore } from '@/lib/store/onboarding';

import { Button, ButtonText } from '../ui/button';
import Step from '../ui/step';
import { useAuth } from '@/lib/store/auth-store';

const BottomNav = ({ onPress }: { onPress?: () => void }) => {
  const { currentPage } = useOnboardingStore();
  const onboardingStep = useAuth((state) => state.onboardingStep);

  console.log('🚀🚀🚀 ~ onboardingStep:', onboardingStep);

  const totalPages = 2;

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
        {Array.from({ length: totalPages }).map((_, idx) => {
          const isActive = onboardingStep === idx + 1;
          const isCompleted = onboardingStep > idx + 1;
          return <Step key={idx} active={isActive} completed={isCompleted} />;
        })}
      </View>
    </View>
  );
};

export default BottomNav;
