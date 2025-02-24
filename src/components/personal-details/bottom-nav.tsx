import { View } from 'react-native';
import { tv } from 'tailwind-variants';

import { useOnboardingStore } from '@/lib/store/onboarding';

import { Button, ButtonText } from '../ui/button';

const bottomNavStyles = tv({
  slots: {
    barContainer: 'flex-row justify-between gap-4',
    bar: 'h-1 grow rounded-xl bg-[#C9C9C9]',
  },
  variants: {
    active: {
      true: {
        bar: 'bg-primary',
      },
    },
  },
});

const { bar, barContainer } = bottomNavStyles();

const BottomNav = ({ onPress }: { onPress: () => void }) => {
  const totalBars = useOnboardingStore().totalPages;
  const current = useOnboardingStore().current;

  return (
    <View>
      <View className="flex items-end">
        <Button size="lg" variant="ghost" onPress={onPress}>
          <ButtonText className="font-poppins-medium text-[20px]">
            Confirm
          </ButtonText>
        </Button>
      </View>

      <View className={barContainer()}>
        {Array(totalBars).map((_, idx) => {
          return (
            <View key={idx} className={bar({ active: current === idx })} />
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;
