import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type Control, useController, useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { OtpInput } from 'react-native-otp-entry';

import { resendOtpMutation } from '@/api/authentication/resend-otp';
import {
  OTPInputSchema,
  useOtpMutation,
  type Variables,
} from '@/api/authentication/verification';
import GradientView from '@/components/onboarding/gradient-view';
import { colors, Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/lib/store/auth-store';
import { devLog } from '@/lib/utils';
import { AxiosError } from 'axios';

const DEFAULT_TIMEOUT = 60;

const DEFAULT_VALUES: Variables = {
  otp: '',
};

// @TODO Optimize unnecessary re-rendering of entire page due to timer.
export default function Verification() {
  const { control, handleSubmit, setError, setFocus } = useForm<Variables>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(OTPInputSchema),
  });
  const router = useRouter();
  const { entryPoint } = useLocalSearchParams();
  const authStore = useAuth();

  devLog('🚀🚀🚀 ~ Verification ~ params:', entryPoint);

  const [countdown, setCountdown] = useState(DEFAULT_TIMEOUT);
  const [isResendAvailable, setIsResendAvailable] = useState(false);

  useEffect(() => {
    let interval: any;

    if (countdown > 0) {
      interval = setInterval(() => setCountdown((p) => p - 1), 1000);
    } else {
      setIsResendAvailable(true);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const handleResendOtp = async () => {
    handleResend();
    setCountdown(DEFAULT_TIMEOUT);
    setIsResendAvailable(false);
  };

  const handleServerError = (error: Error) => {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 403
    ) {
      setError('otp', {
        type: 'serverError',
        message: error.response?.data.message,
      });
      setFocus('otp');
    }
  };

  const { mutate: handleLogin, isPending } = useOtpMutation({
    onError: handleServerError,
    onSuccess: async (data) => {
      devLog('inside onSuccess callback', data);
      await authStore.signIn(data.data.token);

      if (entryPoint.includes('signup')) {
        devLog('Redirecting to signup flow');
        return router.replace({ pathname: '/personal-details' });
      }

      if (entryPoint.includes('login')) {
        devLog('Redirecting to login flow');
        return router.replace({ pathname: '/after-onboarding/wall' });
      }
    },
  });

  const { mutate: handleResend } = resendOtpMutation();

  return (
    <GradientView className="">
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between">
          {/* Title */}
          <View className="flex gap-4">
            <View className="">
              <View className="mb-3.5 flex-row gap-2">
                <Typography weight={700} color="main" className="text-[32px]">
                  Welcome
                </Typography>
                <Typography
                  weight={700}
                  color="primary"
                  className="text-[32px]"
                >
                  Onboard!
                </Typography>
              </View>

              <View className="">
                <Typography
                  weight={600}
                  color="main"
                  className="font-poppins-bold text-[20px] text-black "
                >
                  Verify your account
                </Typography>
                <Typography
                  weight={500}
                  color="body"
                  className="font-poppins-semibold text-[12px]"
                >
                  OTP send to your email address. Please enter
                </Typography>
              </View>
            </View>

            <ControlledOTPInput control={control} />
          </View>

          {/* Footer */}
          <View>
            <Button
              size="2xl"
              isDisabled={isPending}
              onPress={handleSubmit((data) => {
                handleLogin(data);
              })}
            >
              {isPending && <ActivityIndicator color="white" />}
              <ButtonText weight={500} className="text-[18px] uppercase">
                verify otp
              </ButtonText>
            </Button>

            <View className="mb-[60px]">
              <View className="mb-6  flex flex-row items-center justify-center">
                <Typography weight={500} color="main" className="text-base">
                  Didn't receive OTP?
                </Typography>

                <Button
                  variant="link"
                  className="px-3"
                  onPress={handleResendOtp}
                  disabled={!isResendAvailable}
                >
                  <ButtonText
                    className={`text-base underline ${!isResendAvailable ? 'text-main' : 'text-primary'}`}
                    weight={600}
                  >
                    Resend Code
                  </ButtonText>
                </Button>
              </View>

              <View className="flex-row justify-center">
                {!isResendAvailable && (
                  <Typography weight={800} color="main" className="text-sm ">
                    Resend code in 00:{countdown}
                  </Typography>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}

const _THEME = {
  containerStyle: {
    height: 52,
    justifyContent: 'start',
    gap: 20,
  },
  pinCodeContainerStyle: {
    height: 52,
    width: 52,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: '#00000038',
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  focusStickStyle: {
    borderColor: colors.primary,
    borderWidth: 1,
    height: 20,
  },
  pinCodeTextStyle: {
    fontFamily: 'Poppins-Bold',
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
