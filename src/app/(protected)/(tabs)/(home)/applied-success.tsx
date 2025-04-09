import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';

const AppliedSuccess = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = useCallback(() => {
    console.log('Back button pressed');
    router.dismissTo({ pathname: '/(protected)/(tabs)/(home)' });
  }, [router]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BasicHeaderButton label="Back" onPress={goBack} />,
    });
  }, [goBack, navigation, router]);

  return (
    <SafeAreaView>
      <Text>AppliedSuccess</Text>
    </SafeAreaView>
  );
};

export default AppliedSuccess;
