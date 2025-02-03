import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput, Text } from '@/components/ui';

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
          <View className="z-10 m-4 mt-14 grow">
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
              <View className="mt-6">
                {/* Submit Button */}
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="mt-6 flex h-[60px] items-center justify-center rounded-md bg-primary "
                >
                  <Text className="text-center text-lg font-semibold text-white">
                    Send OTP
                  </Text>
                </Pressable>

                <Text className="mt-2 text-center text-sm font-medium text-[#161616]">
                  If you already have an account ?
                  <Link
                    className="font-medium text-primary"
                    href={{ pathname: '/login' }}
                  >
                    &nbsp;Login
                  </Link>
                </Text>

                <View className="mt-6 flex-row items-center justify-center gap-1">
                  <Text className="text-center text-xs">You agree to the</Text>
                  <Text className="text-center text-xs text-primary ">
                    Terms & Conditions
                  </Text>
                  <Text className="text-center text-xs text-black ">&</Text>
                  <Text className="text-center text-xs text-primary ">
                    Privacy policy
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </GradientView>

      <StatusBar animated style="dark" />
    </>
  );
}
