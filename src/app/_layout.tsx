// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import { loadSelectedTheme } from '@/lib/hooks';
import { hydrateAuth, useAuth } from '@/lib/store/auth-store';
import { useThemeConfig } from '@/lib/use-theme-config';

export { ErrorBoundary } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(app)',
// };

hydrateAuth();
loadSelectedTheme();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const authStatus = useAuth.use.status();
  const isAuthenticated = authStatus === 'authenticated';
  const segments = useSegments();

  const [fontsLoaded] = useFonts(
    Platform.OS === 'web'
      ? {
          'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
          'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
          'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
          'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
          'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
        }
      : {}
  );

  useEffect(() => {
    if (!fontsLoaded) return;

    const bootstrapAsync = async () => {
      try {
        const inAuthGroup = segments[0] === '(authentication)';
        const inProtectedGroup = segments[0] === '(protected)';

        if (!isAuthenticated && inProtectedGroup) {
          router.replace('/(authentication)/login');
        } else if (isAuthenticated && inAuthGroup) {
          router.replace({ pathname: '/after-onboarding/wall' });
        } else if (!segments.length) {
          router.replace(
            isAuthenticated
              ? '/after-onboarding/wall'
              : '/(authentication)/login'
          );
        }
      } finally {
        // @INFO - This is for development only
        if (__DEV__) {
          // router.navigate({ pathname: '/personal-details' });
        }
        // Only hide splash screen if fonts are loaded (for web)
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    bootstrapAsync();
  }, [isAuthenticated, segments, fontsLoaded]);

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
