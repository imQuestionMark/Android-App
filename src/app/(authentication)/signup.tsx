import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
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

export default function Signup() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      phone: '',
    },
    resolver: zodResolver(SignUpInputschema),
  });

  const { mutate: handleLogin, isPending } = useSignUpMutation();
  return (
    <>
      <GradientView>
        <KeyboardAwareScrollView contentContainerClassName="grow">
          <View className="z-10 m-4 grow">
            <View className="flex-row gap-2">
              <Typography weight={700} color="main" className="text-[32px]">
                Welcome
              </Typography>
              <Typography weight={700} color="primary" className="text-[32px]">
                Onboard!
              </Typography>
            </View>

            <View className="grow justify-between">
              <View>
                {/* First Name */}
                <View className="mt-4">
                  <ControlledInput
                    name="firstName"
                    control={control}
                    label="Enter your first name"
                    placeholder="Enter your first name"
                  />
                </View>

                {/* Last Name */}
                <View className="mt-4">
                  <ControlledInput
                    name="lastName"
                    control={control}
                    label="Enter your last name"
                    placeholder="Enter your last name"
                  />
                </View>

                {/* Email  */}
                <View className="mt-4">
                  <ControlledInput
                    control={control}
                    name="emailAddress"
                    label="Enter your mail id"
                    placeholder="Enter your mail id"
                    hint="we will send you the 4 digit verification code"
                  />
                </View>

                {/* Phone Number */}
                <View className="mt-4">
                  <ControlledInput
                    name="phone"
                    control={control}
                    keyboardType="numeric"
                    placeholder="9876543210"
                    label="Enter your phone number"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Footer */}

              <View className="mb-[60px]">
                <View className="mb-[24px] gap-2">
                  <Button
                    size="lg"
                    isDisabled={isPending}
                    onPress={handleSubmit((data) => handleLogin(data))}
                  >
                    {isPending && <ActivityIndicator color={'white'} />}
                    <ButtonText>Send OTP</ButtonText>
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
