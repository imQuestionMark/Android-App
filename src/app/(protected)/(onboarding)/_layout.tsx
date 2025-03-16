import { Slot } from 'expo-router';

import GradientView from '@/components/onboarding/gradient-view';
import BottomNav from '@/components/personal-details/bottom-nav';
import useBoundStore from '@/lib/store';

const OnboardingLayout = () => {
  const handler = useBoundStore((state) => state.handler);

  return (
    <>
      <GradientView className="m-4">
        <Slot />
        <BottomNav onPress={handler} />
      </GradientView>
    </>
  );
};

export default OnboardingLayout;
