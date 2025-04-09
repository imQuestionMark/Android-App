import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen name="applied-success" options={{ title: '' }} />
      <Stack.Screen name="company-details" options={{ title: '' }} />
      <Stack.Screen name="job-details" options={{ title: '' }} />
    </Stack>
  );
}
