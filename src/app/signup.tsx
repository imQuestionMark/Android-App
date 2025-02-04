import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';

const schema = z.object({
  firstName: z
    .string({ required_error: 'FirstName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  lastName: z
    .string({ required_error: 'LastName is required' })
    .min(3, 'Minimum 3 characters')
    .max(16, 'Maximum 16 characters'),
  email: z.string().min(1, 'Email is required').email(),
  phone: z.coerce
    .number({
      required_error: 'Phone no. is required.',
      message: 'Must be only numbers',
    })
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .transform(String),
});

type TSignup = z.infer<typeof schema>;

export default function Signup() {
  const { control, handleSubmit } = useForm<TSignup>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: TSignup) => {
    console.log(data);
  };

  return (
    <>
      <GradientView>
        <KeyboardAwareScrollView contentContainerClassName="grow">
          {/* @TOOD: Fix margin hack */}
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
                    placeholder="Enter your first name"
                    label="Enter your first name"
                  />
                </View>

                {/* Last Name */}
                <View className="mt-4">
                  <ControlledInput
                    name="lastName"
                    control={control}
                    placeholder="Enter your last name"
                    label="Enter your last name"
                  />
                </View>

                {/* Email  */}
                <View className="mt-4">
                  <ControlledInput
                    name="email"
                    control={control}
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
                    placeholder="9876543210"
                    label="Enter your phone number"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Footer */}
              <View className="">
                {/* Submit Button */}
                <Pressable
                  onPress={handleSubmit(onSubmit)}
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

                    <Link href={{ pathname: '/login' }} className="">
                      <Text className="font-medium text-primary">Login</Text>
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
                    <Text className="text-primary underline">
                      privacy policy
                    </Text>
                  </View>
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
