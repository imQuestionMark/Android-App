import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { z } from 'zod';

import GradientView from '@/components/onboarding/gradient-view';
import { ControlledInput } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export const SecondSchema = z.object({
  currentCTC: z.coerce
    .number({
      required_error: 'Current CTC is required.',
      message: 'Must be only numbers',
    })
    .positive()
    .transform(String),
  expectedCTC: z.coerce
    .number({
      required_error: 'Expected CTC is required.',
      message: 'Must be only numbers',
    })
    .positive()
    .transform(String),
});

export type Variables = z.infer<typeof SecondSchema>;

export default function Professional2() {
  const { control, handleSubmit } = useForm<Variables>({
    defaultValues: {
      expectedCTC: '',
      currentCTC: '',
    },
    resolver: zodResolver(SecondSchema),
  });

  return (
    <>
      <GradientView>
        <KeyboardAwareScrollView contentContainerClassName="grow">
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
                    name="currentCTC"
                    control={control}
                    label="Current CTC"
                    placeholder="8 LPA"
                    keyboardType="numeric"
                  />
                </View>

                {/* Last Name */}
                <View className="mt-4">
                  <ControlledInput
                    control={control}
                    name="expectedCTC"
                    label="Current CTC"
                    placeholder="8 LPA"
                    keyboardType="numeric"
                  />
                </View>

                {/* Footer */}
                <View className="mt-6">
                  <Button
                    size="lg"
                    onPress={handleSubmit((data) => console.log(data))}
                  >
                    <ButtonText>Send OTP</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </GradientView>
    </>
  );
}
