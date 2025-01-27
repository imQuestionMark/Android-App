import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInput } from 'react-native-otp-entry';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';

const schema = z.object({
  otp: z.string({ required_error: 'Please enter otp' }),
});

type TSignup = z.infer<typeof schema>;

const _THEME = {
  containerStyle: { height: 52 },
  pinCodeContainerStyle: {
    marginLeft: 2,
    marginRight: 20,
    marginHorizontal: 20,
    height: 52,
    width: 52,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#5A5A5A',
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 2,
    borderColor: '#5A5A5A',
  },
  focusStickStyle: {
    borderColor: '#5A5A5A',
    borderWidth: 1,
    height: 20,
  },
  pinCodeTextStyle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
  },
};

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
    <GradientView>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerClassName="grow"
      >
        <View className="flex-1 justify-between px-4 pt-8">
          <View className="flex-1 ">
            <View className="mx-4 mb-3.5 mt-4">
              <Text className="text-black-500 flex flex-row font-poppins text-[32px] font-bold">
                Welcome
                <Text className="font-poppins text-[32px] font-bold text-primary">
                  Onboard!
                </Text>
              </Text>
            </View>
            <View className="mx-4 mt-1">
              <Text className="mb-2 font-poppins text-[20px] font-semibold text-[#161616] ">
                Verify your account
              </Text>
              <Text className="mb-1 mt-1.5 font-poppins text-[12px] font-medium leading-[14px] tracking-[0.5px]">
                OTP send to your email address.Please enter
              </Text>
            </View>
            <View className="mx-4 mt-4">
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange } }) => (
                  <View className="mt-4">
                    <OtpInput
                      numberOfDigits={4}
                      theme={_THEME}
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
          </View>

          <View className="mx-[25px]">
            <Pressable
              onPress={handleSubmit(submitotp)}
              className="flex h-[60px] items-center justify-center rounded-lg bg-primary py-3"
            >
              <Link href="/signin">
                <Text className="text-4.5 mt-3.5 h-[31px] text-center font-poppins font-semibold leading-[170%] text-white">
                  VERIFY OTP
                </Text>
              </Link>
            </Pressable>
            <View className="mx-[25px]">
              <View className="flex flex-row items-center justify-center">
                <Text className="m-0 p-0 text-center font-poppins font-medium leading-[30.6px] text-gray-500">
                  Didn't recieve code?
                </Text>
                <Pressable onPress={signIn} className="ml-0 p-0">
                  <Text className="font-medium text-primary"> Resend code</Text>
                </Pressable>
              </View>

              <Text className="text-black-400 font-regular flex flex-row text-center font-poppins  leading-[30.6px]">
                You agree to the
                <Text className="flex flex-row font-medium text-primary underline">
                  terms & Conditions
                </Text>
                & <Text className="text-primary underline">privacy policy</Text>
              </Text>
            </View>
            V
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
