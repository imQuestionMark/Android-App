import { Stack } from 'expo-router';

export default function WallLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="upload-details" options={{}} />
    </Stack>
  );
}
