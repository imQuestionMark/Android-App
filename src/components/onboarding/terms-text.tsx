import { Text, View } from 'react-native';

export const TermsandConditions = () => {
  return (
    <View className="flex-row items-center justify-center gap-1.5">
      <Text className="font-poppins text-black">You agree to the</Text>
      <Text className="font-poppins text-primary underline">
        terms & conditions
      </Text>
      <Text className="font-poppins">&</Text>
      <Text className="font-poppins text-primary underline">
        privacy policy
      </Text>
    </View>
  );
};
