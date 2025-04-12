import Ionicons from '@expo/vector-icons/Ionicons';
import { HeaderBackButton } from '@react-navigation/elements';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRootNavigationState, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { BackHandler, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import { Hashtag } from '@/components/ui/icons/hashtag';

const AppliedSuccess = () => {
  const router = useRouter();
  const state = useRootNavigationState();
  console.log(JSON.stringify(state, null, 2));

  const goToHome = useCallback(() => {
    console.log('Back button pressed');
    router.dismissTo({ pathname: '/(protected)/(tabs)/(home)' });
  }, [router]);

  const backAction = useCallback(() => {
    console.log('Trapped Back Handler');
    goToHome();
    return true;
  }, [goToHome]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  return (
    <SafeAreaView className="grow p-4" edges={['top']}>
      <View className="mb-4 flex-row">
        <HeaderBackButton
          accessibilityLabel="Go to Home"
          onPress={goToHome}
          style={{ paddingHorizontal: 0, marginHorizontal: 0 }}
          backImage={() => <Ionicons name="arrow-back" size={24} />}
        />
      </View>

      <LinearGradient
        colors={['#DFE8FF', 'white']}
        style={{
          borderRadius: 12,
        }}
      >
        <Image
          source={require('assets/wall-pattern.png')}
          className="absolute size-full"
        />
        <View className=" items-center justify-center rounded-2xl border border-primary p-6">
          <Typography className="text-[20px] text-main" weight={600}>
            Job Applied!
          </Typography>

          <Typography className="mt-[12px] text-[14px] text-[#596574]">
            Job applied successfully
          </Typography>

          <View className="mt-8 flex-row items-center">
            <Image
              source={require('assets/apple.png')}
              contentFit="contain"
              className="size-[55px] overflow-hidden rounded-full border border-black"
            />
            <Hashtag
              width={24}
              height={24}
              className="-ml-1"
              color={'#0400D1'}
            />
            <Image
              source={require('assets/profile.png')}
              contentFit="contain"
              className="size-[55px] overflow-hidden rounded-full"
            />
          </View>

          <View className="mt-6 flex-row flex-wrap gap-4">
            <Button variant="solid" className="grow" onPress={goToHome}>
              <ButtonText className="text-[13px]">Browse Job</ButtonText>
            </Button>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AppliedSuccess;
