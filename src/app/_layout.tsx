// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { router, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import { hydrateAuth, useAuth } from '@/lib/auth';
import { loadSelectedTheme } from '@/lib/hooks';
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

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const inAuthGroup = segments[0] === '(authentication)';
        const inProtectedGroup = segments[0] === '(protected)';

        if (!isAuthenticated && inProtectedGroup) {
          router.replace('/(authentication)/login');
        } else if (isAuthenticated && inAuthGroup) {
          router.replace('/(protected)/home');
        } else if (!segments.length) {
          router.replace(
            isAuthenticated ? '/(protected)/home' : '/(authentication)/login'
          );
        }
      } finally {
        // @INFO - This is for development only
        if (__DEV__) {
          router.navigate({
            pathname: '/after-onboarding/(basic-informations)/skills',
          });
        }
        await SplashScreen.hideAsync();
      }
    };

    bootstrapAsync();
  }, [isAuthenticated, segments]);

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(authentication)" />
        <Stack.Screen name="(protected)" />
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
