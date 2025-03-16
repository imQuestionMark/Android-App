// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { router, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import { useThemeConfig } from '@/lib/use-theme-config';
import { devLog } from '@/lib/utils';

import useBoundStore, { hydrateAuth } from '../lib/store/index';

export { ErrorBoundary } from 'expo-router';

hydrateAuth();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const authStatus = useBoundStore((state) => state.status);
  const onboardingStep = useBoundStore((state) => state.onboardingStep);

  const segments = useSegments();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const isAuthenticated = authStatus === 'authenticated';
      const hasCompletedOnboarding = onboardingStep === 9999;

      try {
        const inAuthGroup = segments[0] === '(authentication)';
        const inProtectedGroup = segments[0] === '(protected)';
        const needsOnboarding = isAuthenticated && !hasCompletedOnboarding;

        console.log('🔍 Auth Group:', inAuthGroup);
        console.log('🔍 Protected Group:', inProtectedGroup);
        console.log('📝 Needs Onboarding:', needsOnboarding);

        if (!isAuthenticated && inProtectedGroup) {
          devLog('🚫 Not authenticated. Redirecting to login.');
          return router.replace('/(authentication)/login');
        }

        if (isAuthenticated && needsOnboarding) {
          devLog('🚀 Authenticated but onboarding pending.');
          if (onboardingStep === 2) {
            return router.replace({ pathname: '/professional-details' });
          } else {
            return router.replace({ pathname: '/personal-details' });
          }
        }

        if (isAuthenticated && inAuthGroup) {
          devLog('✅ Authenticated in auth group → Redirecting to wall.');
          return router.replace({ pathname: '/after-onboarding/wall' });
        }

        if (!segments.length) {
          devLog('🏠 No segments --> Redirecting based on auth status.');
          return router.replace(
            isAuthenticated ? '/after-onboarding/wall' : '/login'
          );
        }
      } finally {
        // @INFO - This is for development only
        if (__DEV__) {
          // router.navigate({
          //   pathname: '/after-onboarding/(basic-informations)/education',
          // });
        }
        await SplashScreen.hideAsync();
      }
    };

    bootstrapAsync();
  }, [authStatus, onboardingStep, segments]);

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(authentication)" />
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="stepper" />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      // className={theme.dark ? `dark` : undefined} //disable dark mode
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <Toaster
                invert
                richColors
                closeButton
                duration={4000}
                position="bottom-center"
                swipeToDismissDirection="left"
              />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
