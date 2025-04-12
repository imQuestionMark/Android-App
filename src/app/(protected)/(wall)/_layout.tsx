import { Stack } from 'expo-router';

export default function WallLayout() {
  console.log('Running wall layout');
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
        name="upload-details"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
