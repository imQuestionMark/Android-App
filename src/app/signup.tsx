/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
//import { useRouter } from 'expo-router';
// import React from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import {
//   KeyboardAvoidingView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function Signup() {
//   //const router = useRouter();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       mailId: '',
//       phoneNo: 0,
//     },
//   });

//   const onSubmit = () => {
//     alert('pressed');
//   };
//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <View className="size-full flex-1 items-start gap-[16px] bg-slate-500">
//         <View className="align-center flex h-[48] w-[322]">
//           <Text className="text-left font-[Poppins] text-[32px] font-bold">
//             <Text className="text-black-500">Welcome</Text>
//             <Text className="text-[#0400D1]"> Onboard</Text>
//           </Text>
//         </View>

//         <View className=" flex h-[406px] w-[398px] flex-1 items-start gap-[16px]">
//           <View className="ml-[6px] flex-col items-start gap-[8px]">
//             <Text className="h-[24px] w-[168] text-left font-[Poppins] ">
//               Enter your first name
//             </Text>
//             <Controller
//               control={control}
//               rules={{
//                 required: 'First name is required',
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   className="h-[50px] w-[398px] rounded-[6px] bg-white opacity-100"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="firstName"
//             />
//             {errors.firstName && (
//               <Text className="font:[Poppins] text-red-500">
//                 {errors.firstName.message}
//               </Text>
//             )}
//           </View>
//           <View className="ml-[6px] flex-col items-start gap-[8px]">
//             <Text className="h-[24px] w-[168] text-left font-[Poppins] ">
//               Enter your Last name
//             </Text>
//             <Controller
//               control={control}
//               rules={{
//                 required: 'Last name is required',
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   className="h-[50px] w-[398px] rounded-[6px] bg-white opacity-100"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="lastName"
//             />

//             {errors.lastName && (
//               <Text className="font:[Poppins] text-red-500">
//                 {errors.lastName.message}
//               </Text>
//             )}
//           </View>

//           <View className="ml-[6px] flex-col items-start gap-[8px]">
//             <Text className="h-[24px] w-[168] text-left font-[Poppins] ">
//               Enter your mail Id
//             </Text>
//             <Text className="h-[14px] w-[270px] text-left font-[Poppins] leading-[14px] tracking-[0.5px] ">
//               We will send you the 4 digit verification code
//             </Text>
//             <Controller
//               control={control}
//               rules={{
//                 required: 'Mail Id is required',
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   className="h-[50px] w-[398px] rounded-[6px] bg-white opacity-100"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                 />
//               )}
//               name="mailId"
//             />

//             {errors.mailId && (
//               <Text className="font:[Poppins] text-red-500">
//                 {errors.mailId.message}
//               </Text>
//             )}
//           </View>

//           <View className="ml-[6px] flex-col items-start gap-[8px]">
//             <Text className="h-[24px] w-[168] text-left font-[Poppins] ">
//               Enter your phone number
//             </Text>
//             <Controller
//               control={control}
//               rules={{
//                 pattern: {
//                   value: /^[0-9]+$/,
//                   message: 'Enter a valid Number',
//                 },
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   className="h-[50px] w-[398px] rounded-[6px] bg-white opacity-100"
//                   keyboardType="numeric"
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value.toString()}
//                 />
//               )}
//               name="phoneNo"
//             />
//           </View>
//         </View>
//         <View className="flex h-[135px] w-[397px] items-center justify-start">
//           <View className="flex h-[90px] w-[380px]">
//             <TouchableOpacity
//               className="flex h-[60px] w-[380px] items-center justify-center rounded-[6px] bg-[#0400D1]"
//               onPress={handleSubmit(onSubmit)}
//             >
//               <Text className="h-[31] w-[81] text-center font-[Poppins] text-[18px] font-semibold text-white ">
//                 Send OTP
//               </Text>
//             </TouchableOpacity>
//             <Text>
//               <Text className="font-[Poppins]">you already have account</Text>
//               <TouchableOpacity>
//                 <Text className="font-[Poppins] text-[#0400D1]">login</Text>
//               </TouchableOpacity>
//             </Text>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { z } from 'zod';

import { ControlledInput } from '@/components/ui';

const schema = z.object({
  firstName: z.string({ required_error: 'Please enter your First Name' }),
  lastName: z.string({ required_error: 'Please enter your Last Name' }),
  phone: z.string({ required_error: 'Please enter your Phone Number' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Incorrect Mail id' }),
});
export default function OnboardingScreen() {
  const { control } = useForm({
    resolver: zodResolver(schema),
  });
  //const router = useRouter();

  const signUp = () => {
    alert('SIGNIN');
    //router.push('/signup.tsx');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
        <View className="mb-4 ml-4 mr-[90px] mt-[17px]">
          <Text className="text-black-500 font-[Poppins] text-[32px] font-bold">
            Welcome{' '}
            <Text className="font-[Poppins] text-[32px] font-bold text-[#0400D1]">
              Onboard!
            </Text>
          </Text>
        </View>

        <View className="mx-4 mb-[97px] mt-8">
          <View className="mb-4">
            <ControlledInput
              name="firstName"
              control={control}
              label="Enter your first name"
            />
          </View>

          <View className="mb-4">
            <ControlledInput
              name="lastName"
              control={control}
              label="Enter your last name"
            />
          </View>

          <View className="mb-4">
            <ControlledInput
              name="email"
              control={control}
              label="Enter your mail id"
              hint="we will send you the 4 digit verification code"
            />
          </View>

          <View>
            <ControlledInput
              name="phone"
              control={control}
              keyboardType="numeric"
              label="Enter your phone No"
            />
          </View>
        </View>

        <View className="mx-[25px]">
          <Pressable className="h-[60px] rounded-lg bg-[#0400D1] py-3">
            <Text className="text-4.5 h-[31px] text-center font-[Poppins] font-semibold leading-[30.6px] text-white">
              Send OTP
            </Text>
          </Pressable>

          <View className="mx-[25px]">
            <View className="flex flex-row items-center justify-center">
              <Text className="m-0 p-0 text-center font-[Poppins] font-medium leading-[30.6px] text-gray-500">
                If you already have an account?
              </Text>
              <TouchableOpacity onPress={signUp} className="ml-0 p-0">
                <Text className="font-medium text-[#0400D1]"> login</Text>
              </TouchableOpacity>
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
