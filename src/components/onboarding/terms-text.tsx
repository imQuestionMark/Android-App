import { Text } from 'react-native';

import { View } from '@/components/ui';

export const TermsandConditions = () => {
  return (
    <View className="flex-row items-center justify-center gap-1.5">
      <Text className="font-regular  font-poppinstext-black">
        You agree to the
      </Text>
      <Text className="text-primary underline">terms & Conditions</Text>
      <Text className="">&</Text>
      <Text className="text-primary underline">privacy policy</Text>
    </View>
  );
};
