import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { type Control, useController, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInput } from 'react-native-otp-entry';

import {
  OTPInputSchema,
  useOtpMutation,
  type Variables,
} from '@/api/authentication/verification';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { ErrorMessage } from '@/components/professional/components/error-message';
import { Button, ButtonText } from '@/components/ui/button';

export default function Verification() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(OTPInputSchema),
  });

  const { mutate: handleLogin, isPending } = useOtpMutation();
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

            <ControlledOTPInput control={control} />
          </View>

          {/* Footer */}
          <View>
            <Button
              size="lg"
              isDisabled={isPending}
              onPress={handleSubmit((data) => handleLogin(data))}
            >
              {isPending && <ActivityIndicator color={'white'} />}
              <ButtonText>Send OTP</ButtonText>
            </Button>

            <View>
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                  Didn't receive OTP?
                </Text>

                <Link href={{ pathname: '/signup' }}>
                  <Text className="font-medium text-primary">Resend</Text>
                </Link>
              </View>

              <TermsandConditions />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}

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

const ControlledOTPInput = ({ control }: { control: Control<Variables> }) => {
  const {
    field: { onChange, ref },
    fieldState: { error },
  } = useController({
    name: 'otp',
    control,
  });

  return (
    <View>
      <OtpInput
        ref={ref}
        // @ts-ignore
        theme={_THEME}
        type="numeric"
        autoFocus={false}
        numberOfDigits={4}
        onTextChange={(otp) => onChange(otp)}
      />
      <ErrorMessage error={error} />
    </View>
  );
};
