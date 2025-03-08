import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router, usePathname, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  SignUpInputschema,
  useSignUpMutation,
  type Variables,
} from '@/api/authentication/signup';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { ControlledInput, Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/user-store';
import { devLog } from '@/lib/utils';

const DEFAULT_VALUES: Variables = {
  firstName: 'Eminem',
  lastName: 'Gone',
  emailAddress: '19uca004+emma@gmail.com',
  phone: '9080706050',
};

export default function Signup() {
  const router = useRouter();
  const pathname = usePathname();
  const userStore = useUserStore();

  const { mutate: handleRegister, isPending } = useSignUpMutation({
    onSuccess: async (data) => {
      devLog('Sign up success, otp is sent for verification', data);
      // @INFO Saving the userID in expo-secure-store.
      await userStore.saveUserID(data.data.id);
      router.replace({
        pathname: '/verification',
        params: { entryPoint: pathname },
      });
    },
  });

  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(SignUpInputschema),
  });

  return (
    <>
      <GradientView>
        <KeyboardAwareScrollView contentContainerClassName="grow">
          <View className="m-4 grow">
            {/* Title */}
            <View className="flex-row gap-2">
              <Typography weight={700} color="main" className="text-[32px]">
                Welcome
              </Typography>
              <Typography weight={700} color="primary" className="text-[32px]">
                Onboard!
              </Typography>
            </View>

            <View className="grow justify-between">
              <View className="gap-4 mt-4">
                <ControlledInput
                  name="firstName"
                  control={control}
                  label="Enter your first name"
                  placeholder="Enter your first name"
                />

                <ControlledInput
                  name="lastName"
                  control={control}
                  label="Enter your last name"
                  placeholder="Enter your last name"
                />

                <ControlledInput
                  control={control}
                  name="emailAddress"
                  label="Enter your mail id"
                  placeholder="Enter your mail id"
                  labelClassName="mb-2"
                  hintClassName="mb-2"
                  hint="we will send you the 4 digit verification code"
                />

                <ControlledInput
                  name="phone"
                  control={control}
                  keyboardType="numeric"
                  placeholder="9876543210"
                  label="Enter your phone number"
                  maxLength={10}
                />
              </View>

              {/* Footer */}
              <View className="mb-[60px] mt-[25px]">
                <View className="mb-[24px] gap-2">
                  <Button
                    size="2xl"
                    isDisabled={isPending}
                    onPress={handleSubmit((data) => handleRegister(data))}
                  >
                    {isPending && <ActivityIndicator color="white" />}
                    <ButtonText weight={500} className="text-[18px]">
                      Send OTP
                    </ButtonText>
                  </Button>

                  <View className="flex flex-row items-center justify-center gap-2">
                    <Typography
                      weight={500}
                      className="text-[13px]"
                      color="body"
                    >
                      If you don't have an account?
                    </Typography>

                    <Link replace href={{ pathname: '/login' }}>
                      <Typography
                        weight={500}
                        color="primary"
                        className="text-[13px] capitalize"
                      >
                        login
                      </Typography>
                    </Link>
                  </View>
                </View>

                <TermsandConditions />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </GradientView>
    </>
  );
}
