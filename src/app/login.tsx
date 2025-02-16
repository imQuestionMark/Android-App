import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { Link, router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { client } from '@/api';
import { loginInputSchema, type Variables } from '@/api/authentication/login';
import GradientView from '@/components/onboarding/gradient-view';
import { TermsandConditions } from '@/components/onboarding/terms-text';
import { ControlledInput, showError } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export default function Signin() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      email: 'test@gmail.com',
    },
    resolver: zodResolver(loginInputSchema),
  });

  // const { mutate: handleLogin, isPending } = useLoginMutation();
  const {
    mutate: handleLogin,
    isPending,
    ...rest
  } = useMutation({
    mutationFn: async (data: unknown) => {
      const response = await client.post('MOCK_FAILURE', data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.replace({ pathname: '/verification' });
    },
    onError: (error: AxiosError) => {
      console.log(error);
      showError(error);
    },
  });

  console.log(rest);

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between ">
          <View className="">
            <View className="mb-3.5 flex-row gap-2">
              <Text className="font-poppins text-[32px] font-bold text-primary">
                Sign
              </Text>

              <Text className="font-poppins text-[32px] font-bold text-[#161616]">
                in
              </Text>
            </View>

            <View>
              <ControlledInput
                name="email"
                placeholder="Enter your email id"
                control={control}
                label="Enter your email address"
                hint="we will send you the 4 digit verification code"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View>
            <Button
              size="lg"
              onPress={handleSubmit((data) => handleLogin(data))}
              isDisabled={isPending}
            >
              {isPending && <ActivityIndicator color={'white'} />}
              <ButtonText>Send OTP</ButtonText>
            </Button>

            <View className="">
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                  If you already have an account?
                </Text>

                <Link href={{ pathname: '/signup' }} className="">
                  <Text className="font-medium text-primary">SignUp</Text>
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
