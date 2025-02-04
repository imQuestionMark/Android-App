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

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between">
          <View className="flex-1 ">
            <View className="mb-3.5 flex-row gap-2">
              <Text className="font-poppins text-[32px] font-bold text-black">
                Welcome
              </Text>
              <Text className="font-poppins text-[32px] font-bold text-primary">
                Onboard!
              </Text>
            </View>

            <View className="">
              <Text className="mb-2 font-poppins text-[20px] font-semibold text-[#161616] ">
                Verify your account
              </Text>
              <Text className="mb-1 mt-1.5 font-poppins text-[12px] font-medium leading-[14px] tracking-[0.5px]">
                OTP send to your email address. Please enter
              </Text>
            </View>

            <View className="mt-8">
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange } }) => (
                  <OtpInput
                    numberOfDigits={4}
                    // @ts-ignore
                    theme={_THEME}
                    onTextChange={(otp) => {
                      onChange(otp);
                    }}
                    type="numeric"
                    autoFocus={false}
                  />
                )}
              />
            </View>
          </View>

          <View>
            <Pressable
              onPress={handleSubmit(submitotp)}
              className="flex h-[60px] items-center justify-center rounded-md bg-primary "
            >
              <Text className="font-poppins text-lg font-semibold text-white">
                VERIFY OTP
              </Text>
            </Pressable>

            <View className="">
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                  Didn't receive OTP?
                </Text>

                <Link href={{ pathname: '/signup' }}>
                  <Text className="font-medium text-primary">Resend</Text>
                </Link>
              </View>

              <View className="flex-row items-center justify-center gap-1.5">
                <Text className="font-regular  font-poppinstext-black">
                  You agree to the
                </Text>
                <Text className="text-primary underline">
                  terms & Conditions
                </Text>
                <Text className="">&</Text>
                <Text className="text-primary underline">privacy policy</Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
