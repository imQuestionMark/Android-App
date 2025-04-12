import { Stack } from 'expo-router';

export default function HomeStackLayout() {
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
        name="job-details"
        options={{ title: '', headerTintColor: 'black' }}
      />

      <Stack.Screen
        name="company-details"
        options={{ title: '', headerTintColor: 'black' }}
      />

      <Stack.Screen name="applied-success" options={{ headerShown: false }} />
    </Stack>
  );
}
