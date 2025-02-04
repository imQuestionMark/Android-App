import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

type TSignup = z.infer<typeof schema>;

export default function Signin() {
  const { control, handleSubmit } = useForm<TSignup>({
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
      <KeyboardAvoidingView className="m-4 flex-1 justify-between">
        <View className="">
          <View className="mb-3.5 flex-row gap-2">
            <Text className="font-poppins text-[32px] font-bold text-[#161616]">
              Sign
            </Text>

            <Text className="font-poppins text-[32px] font-bold text-primary">
              in!
            </Text>
          </View>

          <View>
            <ControlledInput
              name="email"
              placeholder="Enter your mail id"
              control={control}
              label="Enter your mail id"
              hint="we will send you the 4 digit verification code"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View>
          <Pressable
            onPress={handleSubmit(sendOTP)}
            className="flex h-[60px] items-center justify-center rounded-md  bg-primary "
          >
            <Text className="text-lg font-semibold text-white font-poppins">
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
              <Text className="text-primary underline">terms & Conditions</Text>
              <Text className="">&</Text>
              <Text className="text-primary underline">privacy policy</Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </GradientView>
  );
}
