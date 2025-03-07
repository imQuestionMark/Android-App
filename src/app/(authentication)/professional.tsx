import { zodResolver } from '@hookform/resolvers/zod';
import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import GradientView from '@/components/onboarding/gradient-view';
import BottomNav from '@/components/personal-details/bottom-nav';
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
import { Typography } from '@/components/ui';

const DEFAULT_VALUES: ProfessionalFormData = {
  roles: [],
  locations: [],
  workModes: [],
  currentCTC: '',
  expectedCTC: '',
  experience: '',
};

const Professional = () => {
  const { control, handleSubmit } = useForm<ProfessionalFormData>({
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(professionalFormSchema),
  });

  const onSubmit: SubmitHandler<ProfessionalFormData> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<ProfessionalFormData> = (error) => {
    console.warn(JSON.stringify(error, null, 2));
  };

  const handlePress = () => {
    console.log('handleButtonPresss');
    handleSubmit(onSubmit, onError)();
  };

  return (
    <GradientView>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="m-4 flex-1 justify-between">
          <View className="">
            <Typography weight={600} color="main" className="text-[24px]">
              Job preference
            </Typography>

            <View className="mt-6 gap-5">
              <Role control={control} />
              <Experience control={control} />
              <Location control={control} />
              <ModeOfWork control={control} />
              <CTC control={control} />
              <ExpCTC control={control} />
            </View>
          </View>

          <BottomNav onPress={handlePress} />
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
};

export default Professional;
