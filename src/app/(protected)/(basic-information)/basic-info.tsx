/* eslint-disable max-lines-per-function */
import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Locations } from '@/components/basic-informations/basic-info/components/location';
import {
  type BasicInfoFormData,
  BasicInfoFormSchema,
} from '@/components/basic-informations/basic-info/schema';
import { Button, ControlledInput } from '@/components/ui';
import { useWallNavigationFlow } from '@/lib/hooks/(basic-information)/use-navigation-flow';

const defaultValues: BasicInfoFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  locations: '',
  TBY: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself wet`,
};

export default function BasicInfo() {
  useWallNavigationFlow();

  const { control, trigger, clearErrors } = useForm<BasicInfoFormData>({
    defaultValues,
    resolver: zodResolver(BasicInfoFormSchema),
  });
  const [imagePath, setImagePath] = useState<null | string>(null);

  // useEffect(() => {
  //   const preload = CommonActions.preload('links');
  //   console.log('Preload', preload);
  //   navigation.dispatch(preload);
  // }, [navigation]);

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
  const insets = useSafeAreaInsets();

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      const { uri } = result.assets[0];
      setImagePath(uri);
      console.log('Image path:', uri);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="grow pb-4"
      bottomOffset={100}
      showsVerticalScrollIndicator={false}
    >
      <View
        className="grow bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <View className="grow gap-4">
          <View className=" mx-auto items-center justify-center ">
            <Button
              onPress={() => {
                console.log('Opening image picker');
                openImagePicker();
              }}
              testID="basic-info-image-picker"
              className="relative h-auto bg-transparent"
            >
              <Image
                contentFit="cover"
                className="size-[100px] rounded-full"
                source={imagePath ?? require('assets/basic-profile.png')}
                cachePolicy="memory-disk"
                testID="image-view"
              />
              <Button
                variant="icon"
                className="absolute bottom-1 right-6 size-7 border-0 bg-[#E5E5FF]"
              >
                <Feather name="edit-2" size={14} color="#0400D1" />
              </Button>
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
            autoCorrect={false}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
