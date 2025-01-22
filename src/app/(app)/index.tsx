/* eslint-disable no-empty-pattern */
/* eslint-disable max-lines-per-function */
// import { FlashList } from '@shopify/flash-list';
// import React from 'react';

// import type { Post } from '@/api';
// import { usePosts } from '@/api';
// import { Card } from '@/components/card';
// import { EmptyList, FocusAwareStatusBar, Text, View } from '@/components/ui';

// export default function Feed() {
//   const { data, isPending, isError } = usePosts();
//   const renderItem = React.useCallback(
//     ({ item }: { item: Post }) => <Card {...item} />,
//     []
//   );

//   if (isError) {
//     return (
//       <View>
//         <Text> Error Loading data </Text>
//       </View>
//     );
//   }
//   return (
//     <View className="flex-1 ">
//       <FocusAwareStatusBar />
//       <FlashList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => 'item-${index}`}
//         ListEmptyComponent={<EmptyList isLoading={isPending} />}
//         estimatedItemSize={300}
//       />
//     </View>
//   );
// }

//import { useRouter } from 'expo-router';

/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { z } from 'zod';

import { signIn } from '@/lib';

const schema = z.object({
  otp: z.string({ required_error: 'Please enter otp' }),
});

type TSignup = z.infer<typeof schema>;

export default function Verification() {
  const { control, handleSubmit } = useForm<TSignup>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(schema),
  });

  const submitotp = (data: { otp: string }) => {
    console.log('OTP Submitted:', data.otp);
  };

  const signIn = () => {};
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
        <View className="mb-3.5 ml-4 mr-[90px] mt-[17px]">
          <Text className="text-black-500 font-[Poppins] text-[32px] font-bold">
            Welcome{' '}
            <Text className="font-[Poppins] text-[32px] font-bold text-[#0400D1]">
              Onboard!
            </Text>
          </Text>
        </View>
        <View className="mx-4">
          <Text className="text-grey-100 mb-2 font-[Poppins] text-[20px] font-semibold  dark:text-neutral-100">
            Verify your account
          </Text>
          <Text className="mb-1 font-[Poppins] text-[12px] font-medium leading-[14px] tracking-[0.5px]">
            OTP send to your mail.Please enter
          </Text>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: 'OTP is required',
              minLength: {
                value: 4,
                message: 'OTP must be 4 digits',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <OtpInput
                numberOfDigits={4}
                onTextChange={(otp) => {
                  onChange(otp);
                }}
                type="numeric"
              />
            )}
          />
        </View>

        <View className="mx-[25px] mt-[413px]">
          <Pressable
            onPress={handleSubmit(submitotp)}
            className="h-[60px] rounded-lg bg-[#0400D1] py-3"
          >
            <Text className="text-4.5 h-[31px] text-center font-[Poppins] font-semibold leading-[30.6px] text-white">
              Verify OTP
            </Text>
          </Pressable>

          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-[Poppins] font-medium leading-[30.6px] text-gray-500">
                Didn't recieve code?
              </Text>
              <Pressable onPress={signIn} className="ml-0 p-0">
                <Text className="font-medium text-[#0400D1]"> Resend code</Text>
              </Pressable>
            </View>

            <Text className="text-black-400 font-regular text-center font-[Poppins]  leading-[30.6px]">
              You agree to the{' '}
              <Text className="font-medium text-[#0400D1] underline">
                terms & Conditions
              </Text>{' '}
              & <Text className="text-[#0400D1] underline">privacy policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
