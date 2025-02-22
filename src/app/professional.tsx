import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import GradientView from '@/components/onboarding/gradient-view';
import {
  CTC,
  ExpCTC,
  Experience,
  Location,
  ModeOfWork,
  Role,
} from '@/components/professional/components';
import {
  type ProfessionalFormData,
  professionalFormSchema,
} from '@/components/professional/schema';
import { Button, ButtonText } from '@/components/ui/button';

const Professional = () => {
  const { control, handleSubmit } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      roles: [],
      experience: undefined,
      locations: [],
      workModes: [],
      currentCTC: 0,
      expectedCTC: 0,
    },
  });

  const handlePress = () => {
    console.log('Inside Handle press');
    handleSubmit((data) => console.log(data));
  };

  return (
    <GradientView>
      <View className="m-4 flex-1 justify-between">
        <View className="">
          <Text className="font-poppins-semibold text-2xl">Job preference</Text>

          <KeyboardAwareScrollView className="mt-6">
            {/* <Role control={control} />
            <Experience control={control} />
            <Location control={control} />
            <ModeOfWork control={control} /> */}
            <CTC control={control} />
            <ExpCTC control={control} />
          </KeyboardAwareScrollView>
        </View>
      </View>

      <BottomNavigation onPress={handlePress} />
    </GradientView>
  );
};

const BottomNavigation = ({ onPress }: { onPress: () => void }) => {
  return (
    <View>
      <View className="flex items-end ">
        <Button size="lg" variant="ghost" onPress={onPress}>
          <ButtonText className="text-[20px] font-medium">Confirm</ButtonText>
        </Button>
      </View>

      <View className="flex-row justify-between gap-4">
        <View className="h-1 grow rounded-xl bg-primary" />
        <View className="h-1 grow rounded-xl bg-[#C9C9C9]" />
      </View>
    </View>
  );
};

export default Professional;
