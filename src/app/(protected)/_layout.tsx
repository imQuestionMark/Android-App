import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="(basic-information)" options={{}} />
      <Stack.Screen name="(onboarding)/(stepper)" options={{}} />
      <Stack.Screen name="(onboarding)/upload-resume" options={{}} />
      <Stack.Screen name="(onboarding)/welcome" options={{}} />
      <Stack.Screen name="(profile)" options={{}} />
      <Stack.Screen name="(tabs)" options={{}} />
      <Stack.Screen
        name="(wall)"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
