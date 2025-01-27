/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

type TSignup = z.infer<typeof schema>;

export default function Signin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const sendOTP = () => {
    alert('SIGNIN');
  };

  return (
    <GradientView>
      <KeyboardAvoidingView className="flex-1 px-4 pt-8">
        <View className="mb-3.5 ml-4">
          <Text className="text-black-500 font-poppins text-[32px] font-bold">
            Sign
            <Text className="font-poppins text-[32px] font-bold text-primary">
              in!
            </Text>
          </Text>
        </View>
        <View className="mx-4">
          <ControlledInput
            name="email"
            control={control}
            label="Enter your mail id"
            hint="we will send you the 4 digit verification code"
          />
          {errors.email && (
            <Text className="mb-2 text-sm font-semibold text-red-500">
              {errors.email.message}
            </Text>
          )}
        </View>

        <View className="mx-[25px] mt-[413px]">
          <Pressable
            onPress={handleSubmit(sendOTP)}
            className="h-[60px] rounded-lg bg-primary py-3"
          >
            <Text className="text-4.5 h-[31px] text-center font-poppins font-semibold leading-[30.6px] text-white">
              Send OTP
            </Text>
          </Pressable>

          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-poppins font-medium leading-[30.6px] text-gray-500">
                If you already have an account?
              </Text>
              <Link href={{ pathname: '/signup' }} className="ml-0 p-0">
                <Text className="font-medium text-primary"> SignUp</Text>
              </Link>
            </View>

            <Text className="font-regular text-center font-poppins leading-[30.6px] text-black">
              You agree to the
              <Text className="font-medium text-primary underline">
                terms & Conditions
              </Text>
              & <Text className="text-primary underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GradientView>
  );
}
