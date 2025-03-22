import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Locations } from '@/components/basic-informations/basic-info/components/location';
import {
  type BasicInfoFormData,
  BasicInfoFormSchema,
} from '@/components/basic-informations/basic-info/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
export default function BasicInfo() {
  const {
    control,
    //  handleSubmit
  } = useForm<BasicInfoFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      locations: '',
      TBY: '',
    },
    resolver: zodResolver(BasicInfoFormSchema),
  });
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="mt-7 flex-row justify-between">
          <Button className="bg-white">
            <ButtonText className="text-primary">Back</ButtonText>
          </Button>
          <Typography weight={500} color="main">
            Basic Info
          </Typography>
          <Button className="bg-white">
            <ButtonText className="text-primary">Next</ButtonText>
          </Button>
        </View>
        <View className="mt-7 justify-between gap-4 px-4">
          <View className="items-center justify-center">
            <Button className="bg-white">
              <Image
                contentFit="contain"
                className="size-[100px]"
                source={require('assets/basic-profile.svg')}
              />
            </Button>
          </View>
          <ControlledInput
            //className="text-[14px]"
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

          <Typography weight={500} className="mb-1 text-[14px] text-[#0B0B0B]">
            Tell About Yourself
          </Typography>
          <Controller
            control={control}
            name="TBY"
            render={({ field: { onChange, value } }) => {
              const wordCount = value
                ? value.split(/\s+/).filter(Boolean).length
                : 0;
              const isLimitExceeded = wordCount > 150;

              return (
                <View>
                  <TextInput
                    className="text-gray-800 mb-1 rounded-lg border border-[#0000001A] p-3 text-base"
                    multiline
                    value={value}
                    onChangeText={onChange}
                  />
                  <Typography
                    weight={400}
                    className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                  >
                    Maximum 150 words
                  </Typography>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
