import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import GradientView from '@/components/onboarding/gradient-view';
import {
  type ProfessionalFormData,
  professionalFormSchema,
} from '@/components/professional/schema';
import { ControlledInput } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

const Professional = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      roles: [],
      locations: [],
      workModes: [],
      currentCTC: '',
      expectedCTC: '',
    },
  });

  const handlePress = () => {
    console.log('Inside Handle press');
    console.log({ errors });
    handleSubmit((data) => console.log({ data }));
  };

  return (
    <GradientView>
      <View className="m-4 flex-1 justify-between">
        <View className="">
          <Text className="font-poppins-semibold text-2xl">Job preference</Text>

          <View className="mt-6">
            <ControlledInput
              name="currentCTC"
              control={control}
              label="Current CTC"
              placeholder="8 LPA"
            />
            {/* <Role control={control} />
            <Experience control={control} />
            <Location control={control} />
            <ModeOfWork control={control} /> */}
            {/* <CTC control={control} /> */}
            {/* <ExpCTC control={control} /> */}
          </View>
        </View>

        <Button size="lg" variant="primary" onPress={handlePress}>
          <ButtonText className="text-[20px]">Confirm</ButtonText>
        </Button>
      </View>
    </GradientView>
  );
};

export default Professional;
