import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, ScrollView,StyleSheet } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { z } from 'zod';

import { signIn } from '@/lib';
import { black } from '@/components/ui/colors';

const schema = z.object({
  otp: z.string({ required_error: 'Please enter otp' }),
});

type TSignup = z.infer<typeof schema>;

export default function Verification() {
  const { control, handleSubmit } = useForm<TSignup>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(schema),
  });

  const submitotp = (data: { otp: string }) => {
    console.log('OTP Submitted:', data.otp);
  };

  const signIn = () => {};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
      <View className="mb-3.5 ml-4 mr-4 mt-4">
        <Text className="text-black-500 font-[Poppins] text-[32px] font-bold flex flex-row">
          Welcome{' '}
          <Text className="font-[Poppins] text-[32px] font-bold text-[#0400D1]">
            Onboard!
          </Text>
        </Text>
      </View>
        <View className="mx-4 mt-1">
          <Text className="text-[#161616] mb-2 font-[Poppins] text-[20px] font-semibold ">
            Verify your account
          </Text>
          <Text className="mb-1 mt-1.5 font-[Poppins] text-[12px] font-medium leading-[14px] tracking-[0.5px]">
            OTP send to your email address.Please enter
          </Text>
          </View>
        <View className="mx-4 mt-4">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: 'OTP is required',
              minLength: {
                value: 4,
                message: 'OTP must be 4 digits',
              },
            }}
            render={({ field: { onChange, value } }) => (
             <View className='mt-4'>
              <OtpInput
                numberOfDigits={4}
                theme={
                {
                  containerStyle: {height:52},
                  pinCodeContainerStyle:{marginLeft:2,marginRight: 20,marginHorizontal: 20,height:52,width:52,borderRadius:6,backgroundColor: '#FFFFFF',borderWidth: 2,borderColor: '#5A5A5A',},
                  focusedPinCodeContainerStyle:{borderWidth: 2,borderColor: '#5A5A5A',},
                  focusStickStyle:{borderColor:'#5A5A5A',borderWidth: 1,height:20},
                  pinCodeTextStyle:{fontFamily:'Poppins',fontWeight: '600',fontSize: 16,}
                }
                  
                }
                onTextChange={(otp) => {
                  onChange(otp);
                }}
                type="numeric"
                autoFocus={true} 
                
              />
              </View>
            )}
          />
        </View>

        <View className="mx-[25px] mt-[409px]">
         
          <Pressable
            onPress={handleSubmit(submitotp)}
            className="h-[60px] rounded-lg bg-[#0400D1] py-3 flex items-center justify-center"
          ><Link href='/signin'>
            <Text className="mt-3.5 text-4.5 h-[31px] text-center font-[Poppins] font-semibold leading-[170%] text-white">
              VERIFY OTP
            </Text>
            </Link>
          </Pressable>
          
          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-[Poppins] font-medium leading-[30.6px] text-gray-500">
                Didn't recieve code?
              </Text>
              <Pressable onPress={signIn} className="ml-0 p-0">
                <Text className="font-medium text-[#0400D1]"> Resend code</Text>
              </Pressable>
            </View>

            <Text className="text-black-400 flex flex-row font-regular text-center font-[Poppins]  leading-[30.6px]">
              You agree to the{' '}
              <Text className="flex flex-row font-medium text-[#0400D1] underline">
                terms & Conditions
              </Text>{' '}
              & <Text className="text-[#0400D1] underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}