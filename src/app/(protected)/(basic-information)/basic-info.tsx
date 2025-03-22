import Feather from '@expo/vector-icons/Feather';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Locations } from '@/components/basic-informations/basic-info/components/location';
import {
  type BasicInfoFormData,
  BasicInfoFormSchema,
} from '@/components/basic-informations/basic-info/schema';
import { Button, ControlledInput, Typography } from '@/components/ui';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function BasicInfo() {
  const {
    control,
    //  handleSubmit
  } = useForm<BasicInfoFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      locations: '',
      TBY: '',
    },
    resolver: zodResolver(BasicInfoFormSchema),
  });
  return (
    <KeyboardAwareScrollView contentContainerClassName="grow bg-white">
      <View className="justify-between gap-4 px-4">
        <View className="relative m-auto items-center justify-center ">
          <Image
            contentFit="contain"
            className="size-[100px]"
            source={require('assets/basic-profile.png')}
            placeholder={{ blurhash }}
            cachePolicy="memory-disk"
          />
          <Button
            variant="icon"
            className="absolute bottom-1 right-1 size-7 border-0 bg-[#E5E5FF]"
          >
            <Feather name="edit-2" size={14} color="#0400D1" />
          </Button>
        </View>
        <ControlledInput
          //className="text-[14px]"
          name="firstName"
          control={control}
          label="First Name"
          labelClassName="text-[14px]"
          inputClassName="border border-[#0000001A]"
        />

        <ControlledInput
          name="lastName"
          control={control}
          label="Last Name"
          labelClassName="text-[14px]"
          inputClassName="border border-[#0000001A]"
        />

        <ControlledInput
          name="firstName"
          control={control}
          label="Email"
          labelClassName="text-[14px]"
          inputClassName="border border-[#0000001A]"
        />

        <ControlledInput
          name="phoneNo"
          control={control}
          label="Phone Number"
          labelClassName="text-[14px]"
          inputClassName="border border-[#0000001A]"
        />

        <Locations control={control} />

        <Typography weight={500} className="mb-1 text-[14px] text-[#0B0B0B]">
          Tell About Yourself
        </Typography>
        <Controller
          control={control}
          name="TBY"
          render={({ field: { onChange, value } }) => {
            const wordCount = value
              ? value.split(/\s+/).filter(Boolean).length
              : 0;
            const isLimitExceeded = wordCount > 150;

            return (
              <View>
                <TextInput
                  className="text-gray-800 mb-1 rounded-lg border border-[#0000001A] p-3 text-base"
                  multiline
                  value={value}
                  onChangeText={onChange}
                />
                <Typography
                  weight={400}
                  className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                >
                  Maximum 150 words
                </Typography>
              </View>
            );
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
