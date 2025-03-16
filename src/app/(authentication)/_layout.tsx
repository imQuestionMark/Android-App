import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="verification" />
      <Stack.Screen
        name="personal-details"
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="professional-details"
        options={{
          title: '',
          headerShown: true,
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
