// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider, useNavigationState } from '@react-navigation/native';
import { getLoadedFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Toaster } from 'sonner-native';

import { APIProvider } from '@/api';
import { hydrateAuth, loadSelectedTheme } from '@/lib';
import { useThemeConfig } from '@/lib/use-theme-config';

export { ErrorBoundary } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(app)',
// };

hydrateAuth();
loadSelectedTheme();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const canGoBack = useNavigationState((state) => state.index > 0);
  useEffect(() => {
    const available = getLoadedFonts();

    console.log('🚀🚀🚀 ~ useEffect ~ available:', available);

    SplashScreen.hideAsync(); // Hide the splash screen when ready
  }, []);

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: canGoBack,
          headerTitle: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerBackTitle: '',
          headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0)' },
          // headerLeft: () => (
          //   <Pressable className="-ml-2" onPress={() => router.back()}>
          //     <ChevronLeft size={24} color="#808080" />
          //   </Pressable>
          // ),
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="personal-details" />
        <Stack.Screen name="professional" />
        <Stack.Screen name="verification" />
        <Stack.Screen name="test" />
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
