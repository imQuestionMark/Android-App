import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Locations } from '@/components/basic-informations/basic-info/components/location';
import {
  type BasicInfoFormData,
  BasicInfoFormSchema,
} from '@/components/basic-informations/basic-info/schema';
import { Button, ButtonText, ControlledInput } from '@/components/ui';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function BasicInfo() {
  const { control, trigger, clearErrors } = useForm<BasicInfoFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      locations: '',
      TBY: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself wet`,
    },
    resolver: zodResolver(BasicInfoFormSchema),
  });

  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const BASE_PATH = '(protected)/(basic-information)';

  const currentScreen = pathname.slice(1) as WallScreen;

  console.log('🚀🚀🚀 ~ BasicInfo ~ currentScreen:', currentScreen);

  const isLastStep = currentScreen === 'achievement';
  const setCurrentStep = useWallStore((s) => s.setCurrentStep);
  const getPreviousScreen = useWallStore((s) => s.getPreviousScreen);
  const getNextScreen = useWallStore((s) => s.getNextScreen);

  useFocusEffect(
    useCallback(() => {
      console.log('🏹 FIRING USE FOCUS EFFECT++++');
      setCurrentStep(currentScreen);
    }, [currentScreen, setCurrentStep])
  );

  const goBack = useCallback(() => {
    const prev = getPreviousScreen(currentScreen);
    if (prev) {
      console.log({ prevScreen: prev });
      router.push({ pathname: `/${BASE_PATH}/${prev}` });
    } else {
      console.log('No previous screen found, redirecting to wall');
      router.replace({ pathname: '/wall' });
    }
  }, [currentScreen, getPreviousScreen, router]);

  const goNext = useCallback(() => {
    console.log('Firing Next');

    if (isLastStep) {
      console.log('🚀🚀🚀 ~ goNext ~ isLastStep:', isLastStep);
      return router.replace({ pathname: '/wall' });
    }

    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) {
      console.log('🚀🚀🚀 ~ goNext ~ nextScreen:', nextScreen);

      router.push({
        pathname: `/(protected)/(basic-information)/${nextScreen}`,
      });
    }
  }, [currentScreen, getNextScreen, isLastStep, router]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button variant="link" className="px-4">
          <ButtonText onPress={goBack}>Back</ButtonText>
        </Button>
      ),
      headerRight: () => (
        <Button variant="link" className="px-4" onPress={goNext}>
          <ButtonText>Next</ButtonText>
        </Button>
      ),
    });
  }, [goBack, goNext, navigation]);

  const validation = useCallback(
    async (text: string) => {
      console.log('Calling trigger');
      if (text && text.split(/\s+/).filter(Boolean).length > 150) {
        await trigger('TBY');
      } else {
        clearErrors('TBY');
      }
    },
    [trigger, clearErrors]
  );

  const debouncedValidation = useMemo(
    () => debounce(validation, 300),
    [validation]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="grow bg-white"
      bottomOffset={100}
    >
      <SafeAreaView className="grow bg-white" edges={['bottom']}>
        <View className="grow gap-4">
          <View className=" mx-auto items-center justify-center ">
            <Image
              contentFit="contain"
              className="size-[100px]"
              source={require('assets/basic-profile.png')}
              placeholder={{ blurhash }}
              cachePolicy="memory-disk"
            />
            <Button
              variant="icon"
              className="absolute bottom-1 right-1 size-7 border-0 bg-[#E5E5FF]"
            >
              <Feather name="edit-2" size={14} color="#0400D1" />
            </Button>
          </View>

          <ControlledInput
            name="firstName"
            control={control}
            label="First Name"
            labelClassName="text-[14px]"
            inputClassName="border border-[#0000001A]"
          />

          <ControlledInput
            name="lastName"
            control={control}
            label="Last Name"
            labelClassName="text-[14px]"
            inputClassName="border border-[#0000001A]"
          />

          <ControlledInput
            name="firstName"
            control={control}
            label="Email"
            labelClassName="text-[14px]"
            inputClassName="border border-[#0000001A]"
          />

          <ControlledInput
            name="phoneNo"
            control={control}
            label="Phone Number"
            labelClassName="text-[14px]"
            inputClassName="border border-[#0000001A]"
          />

          <Locations control={control} />

          <ControlledInput
            control={control}
            name="TBY"
            label="Tell About Yourself"
            multiline
            labelClassName="text-[14px]"
            onChangeText={debouncedValidation}
            inputClassName="text-gray-800  rounded-lg border border-[#0000001A] bg-white p-3 h-auto text-base"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
