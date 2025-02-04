import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import { client } from '@/api';
import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});

type TLogin = z.infer<typeof schema>;

const MOCK_SUCCESS = 'http/200/1234';
const MOCK_FAILURE = 'http/404/Invalid Email Credentials';

export default function Signin() {
  const { control, handleSubmit } = useForm<TLogin>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const { mutate: handleLogin } = useMutation({
    mutationFn: async (data: TLogin) => {
      const response = await client.post(MOCK_FAILURE, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      router.replace({ pathname: '/verification' });
    },
  });

  const sendOTP = (data: TLogin) => {
    handleLogin(data);
  };

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between ">
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
            <Button size="lg" onPress={handleSubmit(sendOTP)}>
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
