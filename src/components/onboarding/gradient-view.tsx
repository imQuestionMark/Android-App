import { LinearGradient } from 'expo-linear-gradient';
import React, { type ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

import { Hashtag } from '@/components/ui/icons/hashtag';

type TGradientViewProps = {
  children: ReactNode;
  className?: string;
};

const gradientView = tv({
  base: 'flex grow justify-between',
});

export default function GradientView({
  children,
  className,
}: TGradientViewProps) {
  return (
    <LinearGradient
      colors={['#DFE8FF', '#DFE8FF', '#FFFFFF']}
      style={{ flex: 1, flexGrow: 1 }}
    >
      <SafeAreaView className={gradientView({ className })}>
        {children}
        <Hashtag className="absolute bottom-0 right-0 z-[-1]" />
      </SafeAreaView>
    </LinearGradient>
  );
}
