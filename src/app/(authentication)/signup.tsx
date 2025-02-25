import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  SignUpInputschema,
  useSignUpMutation,
  type Variables,
} from '@/api/authentication/signup';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { ControlledInput } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export default function Signup() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      firstName: 'test1',
      lastName: 'test2',
      emailAddress: '19uca004+test@gmail.com',
      phone: '9008007001',
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
              <Text className="text-[32px] font-bold text-black">Welcome</Text>
              <Text className="text-[32px] font-bold text-primary">
                Onboard!
              </Text>
            </View>

            <View className="grow justify-between">
              <View className="">
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
                  />
                </View>
              </View>

              {/* Footer */}
              <View className="mt-6">
                {/* Submit Button */}
                <Button
                  size="lg"
                  isDisabled={isPending}
                  onPress={handleSubmit((data) => handleLogin(data))}
                >
                  {isPending && <ActivityIndicator color={'white'} />}
                  <ButtonText>Send OTP</ButtonText>
                </Button>

                <View className="">
                  <View className="flex flex-row items-center justify-center gap-2">
                    <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                      If you already have an account?
                    </Text>

                    <Link replace href={{ pathname: '/login' }}>
                      <Text className="font-medium text-primary">Login</Text>
                    </Link>
                  </View>

                  <TermsandConditions />
                </View>
                {/*  */}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </GradientView>
    </>
  );
}
