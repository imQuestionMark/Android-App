import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';
import { loginInputSchema, useLoginMutation, Variables } from '@/api/authentication/signIn';



export default function Signin() {
  const { control, handleSubmit ,} = useForm<Variables>({
    defaultValues: {
      email: '',
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
            <Pressable
              className="flex h-[60px] items-center justify-center rounded-md  bg-primary "
              onPress={handleSubmit((data) => handleLogin(data))}
              disabled={isPending}
              >
              <Text className="font-poppins text-lg font-semibold text-white">
                Send OTP
              </Text>
              
            </Pressable>

            <View className="">
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center font-poppins font-medium leading-[30px] text-gray-500 ">
                  If you already have an account?
                </Text>

                <Link href={{ pathname: '/signup' }} className="">
                  <Text className="font-medium text-primary">SignUp</Text>
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
