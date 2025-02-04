import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { type ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

import { Hashtag } from '@/components/ui/icons/hashtag';

type TGradientViewProps = {
  children: ReactNode;
  className?: string;
};

const gradientView = tv({
  base: 'mt-14 flex grow',
});

export default function GradientView({
  children,
  className,
}: TGradientViewProps) {
  return (
    <LinearGradient
      colors={['#DFE8FF', '#DFE8FF', 'white']}
      style={{ flex: 1, flexGrow: 1 }}
    >
      <SafeAreaView className={gradientView({ className })}>
        {children}
        <Hashtag className="absolute bottom-[-40] right-0 z-[-1]" />
      </SafeAreaView>
      <StatusBar animated style="dark" />
    </LinearGradient>
  );
}
