import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          title: 'Verify OTP',
        }}
      />
      <Stack.Screen
        name="personal-details"
        options={{
          title: 'Personal Details',
        }}
      />
      <Stack.Screen
        name="professional"
        options={{
          title: 'Professional Details',
        }}
      />
    </Stack>
  );
}
