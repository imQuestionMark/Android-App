import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { Typography } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-4">
        <Typography weight={600} className="mb-4 text-2xl ">
          This screen doesn't exist. Mic testing
        </Typography>

        <Link replace className="mt-4" href={{ pathname: '/' }}>
          <Typography color="primary" className="underline">
            Go to home screen!
          </Typography>
        </Link>
      </View>
    </>
  );
}
