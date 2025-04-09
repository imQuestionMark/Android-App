import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppliedSuccess = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = useCallback(() => {
    console.log('Back button pressed');
    router.dismissTo({ pathname: '/(protected)/(tabs)/(home)' });
  }, [router]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Button title="Back" onPress={goBack} />,
    });
  }, [goBack, navigation, router]);

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={goBack} />
      <Text>AppliedSuccess</Text>
    </SafeAreaView>
  );
};

export default AppliedSuccess;
