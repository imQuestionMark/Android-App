import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInput } from 'react-native-otp-entry';

import {
  OTPInputschema,
  resendOtpMutation,
  useOtpMutation,
  type Variables,
} from '@/api/authentication/verification';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { Button, ButtonText } from '@/components/ui/button';

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
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      OTP: '',
    },
    resolver: zodResolver(OTPInputschema),
  });

  const [timer, setTimer] = useState(30);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendAvailable(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = handleSubmit((data) => {
    handleResend(data);
    setTimer(30);
    setIsResendAvailable(false);
  });

  const { mutate: handleLogin, isPending } = useOtpMutation();
  const { mutate: handleResend } = resendOtpMutation();
  return (
    <GradientView className="">
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between">
          {/* Title */}
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
                name="OTP"
                control={control}
                render={({ field: { onChange } }) => (
                  <OtpInput
                    // @ts-ignore
                    theme={_THEME}
                    type="numeric"
                    autoFocus={false}
                    numberOfDigits={4}
                    type="numeric"
                    autoFocus={false}
                    numberOfDigits={4}
                    onTextChange={(otp) => {
                      onChange(otp);
                    }}
                  />
                )}
              />
            </View>
          </View>

          {/* Footer */}
          <View>
            <Button
              disabled={isPending}
              onPress={handleSubmit((data) => handleLogin(data))}
              className="flex h-[60px] items-center justify-center rounded-md bg-primary "
            >
              {/* {isPending && <ActivityIndicator color={'white'} />} */}
              <ButtonText>Send OTP</ButtonText>
            </Button>

            <View>
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                  Didn't receive OTP?
                </Text>

                <Pressable
                  onPress={handleResendOtp}
                  disabled={!isResendAvailable}
                >
                  <ButtonText className="font-medium text-primary">
                    {isResendAvailable
                      ? 'Resend OTP'
                      : `Resend OTP in ${timer}s`}
                  </ButtonText>
                </Pressable>
              </View>

              <TermsandConditions />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
