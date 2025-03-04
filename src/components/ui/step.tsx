import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { tv } from 'tailwind-variants';

const stepTv = tv({
  base: 'h-[12px] grow rounded-xl',
  variants: {
    active: {
      true: 'bg-primary',
      false: 'bg-[#0400D14D]',
    },
  },
  defaultVariants: {
    active: false,
  },
});

const Step = ({ active = false }: { active?: boolean }) => {
  const width = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  useEffect(() => {
    width.value = withTiming(active ? 100 : 0, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
  }, [active, width]);

  return (
    <View className={stepTv()}>
      <Animated.View
        className={stepTv({
          active,
          className: 'absolute',
        })}
        style={animatedStyle}
      />
    </View>
  );
};

export default Step;
