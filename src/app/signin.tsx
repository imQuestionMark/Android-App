/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { z } from 'zod';

import { ControlledInput } from '@/components/ui';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

type TSignup = z.infer<typeof schema>;

export default function Signin() {
  const { control, handleSubmit ,formState: { errors }} = useForm<TSignup>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const sendOTP = () => {
    alert('SIGNIN');
  };

  const signIn = () => {
    alert('SIGNIN');
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
        <View className="mb-3.5 ml-4 mr-[90px] mt-[17px]">
          <Text className="text-black-500 font-[Poppins] text-[32px] font-bold">
            Sign{' '}
            <Text className="font-[Poppins] text-[32px] font-bold text-[#0400D1]">
              in!
            </Text>
          </Text>
        </View>
        <View className="mx-4">
          <ControlledInput
            name="email"
            control={control}
            // rules={{
            //   required: 'Email is required',
            //   pattern: {
            //     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            //     message: 'Enter a valid email address',
            //   },
            // }}

            label="Enter your mail id"
            hint="we will send you the 4 digit verification code"
          />
          {errors.email && (
        <Text className="text-red-500 text-sm font-semibold mb-2">{errors.email.message}</Text>
      )}
        </View>

        <View className="mx-[25px] mt-[413px]">
          <Pressable
            onPress={handleSubmit(sendOTP)}
            className="h-[60px] rounded-lg bg-[#0400D1] py-3"
          >
            <Text className="text-4.5 h-[31px] text-center font-[Poppins] font-semibold leading-[30.6px] text-white">
              Send OTP
            </Text>
          </Pressable>

          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-[Poppins] font-medium leading-[30.6px] text-gray-500">
                If you already have an account?
              </Text>
              <TouchableOpacity onPress={signIn} className="ml-0 p-0">
                <Text className="font-medium text-[#0400D1]"> SignUp</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-black-400 font-regular text-center font-[Poppins]  leading-[30.6px]">
              You agree to the{' '}
              <Text className="font-medium text-[#0400D1] underline">
                terms & Conditions
              </Text>{' '}
              & <Text className="text-[#0400D1] underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
