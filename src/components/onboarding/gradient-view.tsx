import { useHeaderHeight } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

import { Hashtag } from '@/components/ui/icons/hashtag';

type TGradientViewProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const gradientView = tv({
  base: 'flex grow',
});

export default function GradientView({
  children,
  className,
  style,
}: TGradientViewProps) {
  const headerHeight = useHeaderHeight();
  console.log('Header Height', headerHeight);

  return (
    <LinearGradient
      style={{ flex: 1, flexGrow: 1 }}
      colors={['#DFE8FF', '#DFE8FF', 'white']}
    >
      <SafeAreaView
        className={gradientView({ className })}
        style={[{ paddingTop: headerHeight / 2 }, style]}
      >
        {children}
        <Hashtag className="absolute bottom-[-40] right-0 z-[-1]" />
      </SafeAreaView>
      <StatusBar animated style="dark" />
    </LinearGradient>
  );
}
