import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import React from 'react';
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProfileCTC } from '@/components/profile/account-details/component/ctc';
import { ProfileExpCTC } from '@/components/profile/account-details/component/expected-ctc';
import { Locations } from '@/components/profile/account-details/component/location';
import { ProfileModeOfWork } from '@/components/profile/account-details/component/mode-of-work';
import { ProfilePreferredLocations } from '@/components/profile/account-details/component/preferred-location';
import {
  type ProfileFormData,
  profileFormSchema,
} from '@/components/profile/account-details/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function AccountDetails() {
  const { control, handleSubmit } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fName: '',
      lName: '',
      email: '',
      phNo: '',
      location: '',
      prefLocation: [],
      workModes: [],
      currentCTC: '',
      expectedCTC: '',
    },
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<ProfileFormData> = (error) => {
    console.warn(JSON.stringify(error, null, 2));
  };

  const handlePress = () => {
    console.log('handleButtonPresss');
    handleSubmit(onSubmit, onError)();
  };

  return (
    <SafeAreaView className=" mt-9 justify-center bg-white  px-[16px]">
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="mb-[25px]">
          <Typography weight={600} color="main" className="text-[24px]">
            Account Details
          </Typography>
        </View>
        <View className="items-center justify-center gap-[24px]">
          <View>
            <Image
              contentFit="contain"
              className="size-[100px]"
              source={require('assets/basic-profile.svg')}
            />
          </View>
          <View className="items-center gap-[8px]">
            <Typography weight={600} color="main" className="text-[24px]">
              Andrew
            </Typography>
            <Typography weight={400} className="text-[18px] text-[#979AA0]">
              UI / UX Designer at Google Inc.
            </Typography>
          </View>
          <View className="mb-[48px] w-full self-center rounded-full border-b border-[#979AA0]" />
        </View>

        <View className=" mb-[57px] justify-between gap-9">
          <ControlledInput
            name={'fName'}
            control={control}
            label="First Name"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
          <ControlledInput
            name={'lName'}
            control={control}
            label="Last Name"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
          <ControlledInput
            name={'email'}
            control={control}
            label="Email"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
          <ControlledInput
            name={'phNo'}
            control={control}
            label="Phone Number"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
          <Locations control={control} />
          <ProfilePreferredLocations control={control} />
          <ProfileModeOfWork control={control} />
          <ProfileCTC control={control} />
          <ProfileExpCTC control={control} />
        </View>
        <View className="items-center ">
          <Button className="w-[223px] " onPress={handlePress}>
            <ButtonText>Save</ButtonText>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
