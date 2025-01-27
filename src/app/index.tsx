import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { z } from 'zod';

import { ControlledCalendar } from '@/components/ui/calendars';

const schema = z.object({
  date: z.string(),
});

type TSignup = z.infer<typeof schema>;

export default function Personaldtls() {
  const { control } = useForm<TSignup>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-slate-400 px-4 pt-8">
        <View className="mb-3.5 ml-5 mr-[90px] mt-[17px]">
          <View className="">
            <Text className="text-black-500 font-[Poppins] text-[32px] font-bold">
              Welcome{' '}
              <Text className="font-[Poppins] text-[32px] font-bold text-[#0400D1]">
                Swetha
              </Text>
            </Text>
          </View>
          <View className="mt-2">
            <Text className="  font-[Poppins] text-[20px] font-medium text-[#5A5A5A]">
              Enter details
            </Text>
          </View>
        </View>
        <View className="ml-5">
          <Text className="  font-[Poppins] text-[20px] font-medium text-[#161616]">
            Enter your D.O.B
          </Text>

          <ControlledCalendar
            name="date"
            control={control}
          ></ControlledCalendar>
        </View>

        <View className="mx-[25px] mt-[413px]">
          <Pressable
            //onPress={handleSubmit(sendOTP)}
            className="h-[60px] rounded-lg bg-[#0400D1] py-3"
          >
            <Text className="text-4.5 h-[31px] text-center font-[Poppins] font-semibold leading-[30.6px] text-white">
              Send OTP
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
