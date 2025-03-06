import { View } from 'react-native';

import { useOnboardingStore } from '@/lib/store/onboarding';

import { Button, ButtonText } from '../ui/button';
import Step from '../ui/step';

const BottomNav = ({ onPress }: { onPress?: () => void }) => {
  const { totalPages, currentPage } = useOnboardingStore();

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
          return <Step key={idx} active={currentPage >= idx} />;
        })}
      </View>
    </View>
  );
};

export default BottomNav;
