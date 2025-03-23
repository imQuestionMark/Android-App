import { useHeaderHeight } from '@react-navigation/elements';
import { LinearGradient } from 'expo-linear-gradient';
import React, { type ReactNode } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';
import { type Edges, SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

import { Hashtag } from '@/components/ui/icons/hashtag';

type TGradientViewProps = {
  children: ReactNode;
  className?: string;
  edges?: Edges;
  style?: StyleProp<ViewStyle>;
};

const gradientView = tv({
  base: 'flex grow',
});

export default function GradientView({
  children,
  className,
  style,
  edges,
}: TGradientViewProps) {
  const headerHeight = useHeaderHeight();
  const finalOffset =
    Platform.OS === 'android' ? headerHeight / 2 : headerHeight / 4;

  return (
    <LinearGradient
      style={{ flex: 1, flexGrow: 1 }}
      colors={['#DFE8FF', '#DFE8FF', 'white']}
    >
      <SafeAreaView
        className={gradientView({ className })}
        style={[{ paddingTop: finalOffset }, style]}
        edges={edges}
      >
        {children}
        <Hashtag className="absolute bottom-[-40] right-0 z-[-1]" />
      </SafeAreaView>
    </LinearGradient>
  );
}
