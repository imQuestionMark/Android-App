import React from 'react';
import { View } from 'react-native';
import { tv } from 'tailwind-variants';

const stepTv = tv({
  base: 'h-[2px] grow rounded-xl',
  variants: {
    active: {
      false: 'bg-[#0400D14D]',
      true: 'bg-primary',
    },
  },
  defaultVariants: {
    active: false,
  },
});

const Step = ({ active = false }: { active?: boolean }) => {
  return (
    <View className={stepTv({ active })}>
      <View
        className={stepTv({
          active: true,
          className: 'absolute h-full rounded-xl',
        })}
        style={{
          width: active ? '100%' : '0%',
        }}
      />
    </View>
  );
};

export default Step;
