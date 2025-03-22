import { Link } from 'expo-router';
import { View } from 'react-native';

import { Typography } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Typography weight={600} className="mb-4 text-2xl ">
          Oops! This screen doesn't exist.
        </Typography>

        <Link replace className="mt-4" href={{ pathname: '/' }}>
          <Typography color="primary" className="underline">
            Go to home screen
          </Typography>
        </Link>
      </View>
    </>
  );
}
