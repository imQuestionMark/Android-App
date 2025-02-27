import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import {
  loginInputSchema,
  useLoginMutation,
  type Variables,
} from '@/api/authentication/login';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { ControlledInput } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export default function Signin() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      identifier: '19uca004@gmail.com',
    },
    resolver: zodResolver(loginInputSchema),
  });

  const { mutate: handleLogin, isPending } = useLoginMutation();

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between ">
          <View className="">
            <View className="mb-3.5 flex-row gap-2">
              <Text className="font-poppins-bold text-[32px] text-primary">
                Sign
              </Text>

              <Text className="font-poppins-bold text-[32px] text-main">
                in
              </Text>
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
          <View>
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
                <Text className="text-center font-poppins-medium text-gray-500 ">
                  If you already have an account?
                </Text>

                <Link replace href={{ pathname: '/signup' }}>
                  <Text className="font-poppins-medium text-primary">
                    SignUp
                  </Text>
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
