/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Locations } from '@/components/basic-informations/education/components/location';
import {
  type EducationFormData,
  EducationFormSchema,
} from '@/components/basic-informations/education/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Education() {
  const {
    control,
    getValues,
    reset,
    resetField,
    trigger,
    handleSubmit,
    formState,
  } = useForm<EducationFormData>({
    defaultValues: {
      education: [
        {
          intName: '2',
          FOS: '',
          startyear: '',
          endyear: '',
          GPA: '',
          locations: '',
        },
        {
          intName: '1',
          FOS: '',
          startyear: '',
          endyear: '',
          GPA: '',
          locations: '',
        },
        {
          intName: '3',
          FOS: '',
          startyear: '',
          endyear: '',
          GPA: '',
          locations: '',
        },
      ],
    },
    resolver: zodResolver(EducationFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'education',
  });

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const handleAddEducation = async () => {
    const educationData = getValues('addEducation');
    const isValid = await trigger('addEducation');
    console.log({ educationData });
    if (educationData === undefined || !isValid) return;

    if (editingIndex !== null) {
      update(editingIndex, educationData);
      setEditingIndex(null);
    } else {
      append(educationData);
    }

    // setShowModal(false);
    // reset();
  };

  const isFlatListView = fields.length > 1;

  return (
    <SafeAreaView className="grow bg-white" edges={['bottom']}>
      <View className=" gap-4 px-4">
        {!isFlatListView ? (
          fields.map((field, index) => (
            <View key={field.id} className="gap-4">
              <ControlledInput
                name={`education.${index}.intName`}
                control={control}
                label="Institution Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8 "
              />
              <ControlledInput
                name={`education.${index}.FOS`}
                control={control}
                label="Field of Study"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
              />
              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <ControlledInput
                    name={`education.${index}.startyear`}
                    control={control}
                    label="Start Year"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
                <View className="flex-1">
                  <ControlledInput
                    name={`education.${index}.endyear`}
                    control={control}
                    label="End Year"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
              </View>
              <ControlledInput
                name={`education.${index}.GPA`}
                control={control}
                label="GPA/Grade"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
              />
              <Locations
                control={control}
                name={`education.${index}.locations`}
              />
            </View>
          ))
        ) : (
          <SafeAreaView>
            <FlatList
              data={fields}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View className="shadow-gray-200 relative mb-1 rounded-lg bg-white px-4 py-3 shadow-lg">
                  <View className="flex-row items-center justify-between">
                    {/* Left Section: Institute Name & Year */}
                    <View className="flex-1">
                      <Typography weight={600} color="body" className="text-lg">
                        {item.intName}
                      </Typography>
                      <Typography color="body" weight={400} type="subtext">
                        {item.startyear} - {item.endyear}
                      </Typography>
                    </View>

                    {/* Right Section: Edit & Delete Buttons */}
                    <View className="flex-row gap-1">
                      {/* Edit Button */}
                      <Pressable
                        onPress={() => {
                          reset({
                            addEducation: {
                              intName: item.intName || '',
                              FOS: item.FOS || '',
                              startyear: item.startyear || '',
                              endyear: item.endyear || '',
                              GPA: item.GPA || '',
                              locations: item.locations || '',
                            },
                          });
                          setEditingIndex(index);
                          setShowModal(true);
                        }}
                        className="p-2"
                      >
                        <Image
                          source={require('assets/edit.svg')}
                          className="size-[15px]"
                        />
                      </Pressable>

                      {/* Delete Button (Hidden for the first item) */}
                      {index !== 0 && (
                        <Pressable
                          onPress={() => remove(index)}
                          className="p-2"
                        >
                          <Image
                            source={require('assets/delete.svg')}
                            className="size-[15px]"
                          />
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View className="bg-gray-400 shadow-gray-500 mb-2 h-px w-full shadow-md" />
              )}
            />
          </SafeAreaView>
        )}

        {/* Add Button - Opens Modal */}
        <Button
          className="mx-[47px] h-[48px] rounded-[12px] border-dashed px-[13.5px]"
          variant="outline"
          onPress={() => setShowModal(true)}
        >
          <Image source={require('assets/add.svg')} className="size-[24px]" />
          <ButtonText className="font-poppins-regular text-[14px] text-primary">
            Add Education
          </ButtonText>
        </Button>
      </View>
      {/* </KeyboardAwareScrollView> */}

      {/* Modal for Adding New Education */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        {/* Blur Background */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center justify-center px-3">
            <View className="w-full gap-4 rounded-2xl bg-white p-6 shadow-lg">
              <Typography weight={600} className="mb-4 text-lg text-[#0B0B0B]">
                Add New Education
              </Typography>

              {/* Modal Form */}
              <ControlledInput
                name="addEducation.intName"
                control={control}
                label="Institution Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <ControlledInput
                name="addEducation.FOS"
                control={control}
                label="Field of Study"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />

              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <ControlledInput
                    name="addEducation.startyear"
                    control={control}
                    label="Start Year"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
                  />
                </View>
                <View className="flex-1">
                  <ControlledInput
                    name="addEducation.endyear"
                    control={control}
                    label="End Year"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
                  />
                </View>
              </View>
              <ControlledInput
                name="addEducation.GPA"
                control={control}
                label="GPA/Grade"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />

              <Locations control={control} name="addEducation.locations" />

              {/* Buttons Row */}
              <View className="mt-4 flex-row justify-between">
                {/* Cancel Button */}
                <Button
                  className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                  onPress={() => setShowModal(false)}
                >
                  <ButtonText className="text-black">Cancel</ButtonText>
                </Button>

                {/* Save Button */}
                <Button
                  className="ml-2 flex-1 bg-primary"
                  onPress={handleAddEducation}
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
