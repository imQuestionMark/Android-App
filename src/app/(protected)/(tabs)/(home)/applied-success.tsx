import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import { Hashtag } from '@/components/ui/icons/hashtag';

const AppliedSuccess = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const goBack = useCallback(() => {
    console.log('Back button pressed');
    router.dismissTo({ pathname: '/(protected)/(tabs)/(home)' });
  }, [router]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={goBack} variant="outline" className="-ml-4 border-0">
          <Ionicons name="arrow-back" size={24} />
        </Button>
      ),
    });
  }, [goBack, navigation, router]);

  return (
    <SafeAreaView className="grow p-4" edges={[]}>
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
            <Link
              href={{ pathname: '/(protected)/(tabs)/(home)' }}
              replace
              asChild
            >
              <Button variant="solid" className="grow">
                <ButtonText className="text-[13px]">Browse Job</ButtonText>
              </Button>
            </Link>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AppliedSuccess;
