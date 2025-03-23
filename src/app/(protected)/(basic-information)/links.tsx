import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  type LinksFormData,
  LinksFormSchema,
} from '@/components/basic-informations/links/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Links() {
  const { control, resetField, getValues } = useForm<LinksFormData>({
    defaultValues: {
      links: [
        { label: 'LinkedIn', url: '' },
        { label: 'GitHub', url: '' },
      ],
      newlinks: '',
    },
    resolver: zodResolver(LinksFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddLink = () => {
    const newLabel = getValues('newlinks');
    if (!newLabel.trim()) {
      Alert.alert('Error', 'Please enter a label for the new link.');
      return;
    }

    append({ label: newLabel, url: '' });
    setShowModal(false);
    resetField('newlinks');
  };

  const handleCancel = () => {
    resetField('newlinks');
    setShowModal(false);
  };

  return (
    <SafeAreaView className="grow bg-white" edges={['bottom']}>
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="justify-between gap-4 px-4">
          {fields.map((field, index) => (
            <View key={field.id} className="relative w-full">
              <ControlledInput
                key={field.id}
                name={`links.${index}.url`}
                control={control}
                label={field.label}
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10"
              />
              {index >= 2 && (
                <Button
                  variant="icon"
                  onPress={() => remove(index)}
                  className="absolute right-3 top-2/3 -translate-y-1/2 border-0 p-2"
                >
                  <Image
                    source={require('assets/delete.svg')}
                    className="size-[20px]"
                  />
                </Button>
              )}
            </View>
          ))}

          <Button
            className="mx-[47px] h-[48px] rounded-[12px] border-dashed px-[13.5px]"
            variant="outline"
            onPress={() => setShowModal(true)}
          >
            <Image source={require('assets/add.svg')} className="size-[24px]" />
            <ButtonText className="font-poppins-regular text-[14px] text-primary">
              Add Links
            </ButtonText>
          </Button>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center px-6">
            <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
              <Typography weight={600} className="mb-4 text-lg text-[#0B0B0B]">
                Add New Link
              </Typography>

              <ControlledInput
                name="newlinks"
                control={control}
                placeholder="Enter label (e.g., Portfolio, Twitter)"
                inputClassName="border border-[#0000001A]"
              />

              <View className="mt-4 flex-row justify-between">
                <Button
                  className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                  onPress={handleCancel}
                >
                  <ButtonText className="text-black">Cancel</ButtonText>
                </Button>

                <Button
                  className="ml-2 flex-1 bg-primary"
                  onPress={handleAddLink}
                >
                  <ButtonText className="text-white">Add</ButtonText>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
