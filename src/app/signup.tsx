import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';
import { SignUpInputschema ,useSignUpMutation,Variables} from '@/api/authentication/signUp';




export default function Signup() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(SignUpInputschema),
  });

  const { mutate: handleLogin, isPending } = useSignUpMutation();
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
              <View className="mt-6">
                {/* Submit Button */}
                <Pressable
                  onPress={handleSubmit((data) => handleLogin(data))}
                  className="flex h-[60px] items-center justify-center rounded-md  bg-primary "
                >
                  <Text className="font-poppins text-lg font-semibold text-white">
                    Submit
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
