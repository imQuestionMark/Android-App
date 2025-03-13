import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Link, usePathname, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  loginInputSchema,
  useLoginMutation,
  type Variables,
} from '@/api/authentication/login';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
import { useUserStore } from '@/lib/store/user-store';
import { devLog } from '@/lib/utils';

const DEFAULT_VALUES: Variables = {
  identifier: '19uca004+when@gmail.com',
};

export default function Signin() {
  const router = useRouter();
  const pathname = usePathname();
  const userStore = useUserStore();

  const { control, handleSubmit, setError, setFocus } = useForm<Variables>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(loginInputSchema),
  });

  const handleServerError = (error: Error) => {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.status === 403
    ) {
      setError('identifier', {
        type: 'serverError',
        message: error.response?.data.message,
      });
      setFocus('identifier');
    }
  };

  const { mutate: handleLogin, isPending } = useLoginMutation({
    onError: handleServerError,
    onSuccess: async (data) => {
      devLog('Valid email:', data);
      await userStore.saveUserID(data.data.id);
      router.replace({
        pathname: '/verification',
        params: { entryPoint: pathname },
      });
    },
  });

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between ">
          <View className="">
            <View className="mb-3.5 flex-row gap-2">
              <Typography weight={700} color="primary" className="text-[32px]">
                Sign
              </Typography>

              <Typography weight={700} color="main" className="text-[32px] ">
                in
              </Typography>
            </View>

            <View>
              <ControlledInput
                name="identifier"
                control={control}
                keyboardType="email-address"
                label="Enter your email address"
                placeholder="Enter your email id"
                hint="we will send you the 4 digit verification code"
              />
            </View>
          </View>

          {/* @REVIEW REQUIRED */}
          <View className="mb-[60px]">
            <View className="mb-[24px] gap-2">
              <Button
                size="2xl"
                isDisabled={isPending}
                onPress={handleSubmit((data) => handleLogin(data))}
              >
                {isPending && <ActivityIndicator color={'white'} />}
                <ButtonText weight={500} className="text-[18px]">
                  Send OTP
                </ButtonText>
              </Button>

              <View className="flex flex-row items-center justify-center gap-2">
                <Typography weight={500} className="text-[13px]" color="body">
                  If you don't have an account?
                </Typography>

                <Link replace href={{ pathname: '/signup' }}>
                  <Typography
                    weight={500}
                    color="primary"
                    className="text-[13px] capitalize"
                  >
                    signup
                  </Typography>
                </Link>
              </View>
            </View>

            <TermsandConditions />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
