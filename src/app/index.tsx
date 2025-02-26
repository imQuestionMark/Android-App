import { View } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const Index = () => {
  console.log('first', initialWindowMetrics);
  return (
    <>
      {/* <SafeAreaView className="grow bg-purple-300"> */}
      <View className="grow bg-red-200"></View>
      {/* </SafeAreaView> */}
    </>
  );
};

export default Index;
