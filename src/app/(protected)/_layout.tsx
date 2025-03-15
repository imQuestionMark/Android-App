import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(onboarding)/after-onboarding/wall"
        options={{
          title: 'Wall',
        }}
      />
      <StatusBar animated style="dark" />
    </Stack>
  );
}
