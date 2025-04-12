import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="(basic-information)"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="(onboarding)" options={{}} />
      <Stack.Screen name="(profile)" options={{}} />
      <Stack.Screen
        name="(tabs)"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="(wall)"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
