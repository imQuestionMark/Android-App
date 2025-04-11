import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useCallback } from 'react';

import { Button } from '@/components/ui';

export default function HomeStackLayout() {
  const router = useRouter();

  const goToHome = useCallback(() => {
    console.log('Back button pressed');
    router.dismissTo({ pathname: '/(protected)/(tabs)/(home)' });
  }, [router]);

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="applied-success"
        options={{
          title: '',
          headerLeft(props) {
            console.log('🚀🚀🚀 ~ headerLeft ~ props:', props);

            return (
              <Button
                onPress={goToHome}
                variant="outline"
                className="-ml-6 border-0"
                hitSlop={{ left: 10, right: 10, bottom: 15 }}
              >
                <Ionicons name="arrow-back" size={24} />
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name="company-details"
        options={{ title: '', headerTintColor: 'black' }}
      />
      <Stack.Screen
        name="job-details"
        options={{ title: '', headerTintColor: 'black' }}
      />
    </Stack>
  );
}
