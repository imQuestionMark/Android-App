import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { z } from 'zod';

import { ControlledInput } from '@/components/ui';

const schema = z.object({
  firstName: z.string({ required_error: 'Please enter your First Name' }),
  lastName: z.string({ required_error: 'Please enter your Last Name' }),
  phone: z.string({ required_error: 'Please enter your Phone Number' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

// eslint-disable-next-line max-lines-per-function
export default function OnboardingScreen() {
  const { control } = useForm({
    resolver: zodResolver(schema),
  });

  const signUp = () => {
    alert('SIGNIN');
    //router.push('/signup.tsx');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
        <View className="mb-4 ml-4 mr-[90px] mt-[17px]">
          <Text className="text-black-500 font-poppins text-[32px] font-bold">
            Welcome{' '}
            <Text className="font-poppins text-[32px] font-bold text-primary">
              Onboard!
            </Text>
          </Text>
        </View>

        <View className="mx-4 mb-[97px] mt-8">
          <View className="mb-4">
            <ControlledInput
              name="firstName"
              control={control}
              label="Enter your first name"
            />
          </View>

          <View className="mb-4">
            <ControlledInput
              name="lastName"
              control={control}
              label="Enter your last name"
            />
          </View>

          <View className="mb-4">
            <ControlledInput
              name="email"
              control={control}
              label="Enter your mail id"
              hint="we will send you the 4 digit verification code"
            />
          </View>

          <View>
            <ControlledInput
              name="phone"
              control={control}
              keyboardType="numeric"
              label="Enter your phone No"
            />
          </View>
        </View>

        <View className="mx-[25px]">
          <Pressable className="h-[60px] rounded-lg bg-primary py-3">
            <Text className="text-4.5 h-[31px] text-center font-poppins font-semibold leading-[30.6px] text-white">
              Send OTP
            </Text>
          </Pressable>

          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-poppins font-medium leading-[30.6px] text-gray-500">
                If you already have an account?
              </Text>
              <TouchableOpacity onPress={signUp} className="ml-0 p-0">
                <Text className="font-medium text-primary"> login</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-black-400 font-regular text-center font-poppins  leading-[30.6px]">
              You agree to the{' '}
              <Text className="font-medium text-primary underline">
                terms & Conditions
              </Text>{' '}
              & <Text className="text-primary underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
