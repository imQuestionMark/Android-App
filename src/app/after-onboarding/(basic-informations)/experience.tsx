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
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Locations } from '@/components/basic-informations/experience/components/location';
import {
  type ExperienceFormData,
  ExperienceFormSchema,
} from '@/components/basic-informations/experience/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Experience() {
  const { control } = useForm<ExperienceFormData>({
    defaultValues: {
      experience: [
        {
          currentWorking: '',
          companyName: '',
          role: '',
          joinDate: '',
          LeaveDate: '',
          locations: '',
        },
      ],
    },
    resolver: zodResolver(ExperienceFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'experience',
  });

  const [showModal, setShowModal] = useState(false);
  const [isFlatListView, setIsFlatListView] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  // Modal form for adding new experience
  const modalForm = useForm({
    defaultValues: {
      addExperience: {
        currentWorking: '',
        companyName: '',
        role: '',
        joinDate: '',
        LeaveDate: '',
        locations: '',
      },
    },
  });

  const handleAddExperience = () => {
    const modalData = modalForm.getValues();
    const experienceData = modalData.addExperience || modalData;
    if (
      !experienceData.currentWorking ||
      !experienceData.joinDate ||
      !experienceData.LeaveDate
    ) {
      return;
    }

    const formattedData = {
      currentWorking: experienceData.currentWorking,
      companyName: experienceData.companyName,
      joinDate: experienceData.joinDate,
      LeaveDate: experienceData.LeaveDate,
      role: experienceData.role || '',
      locations: experienceData.locations,
    };

    if (editingIndex !== null) {
      update(editingIndex, formattedData);
      setEditingIndex(null);
    } else {
      append(formattedData);
      setIsFlatListView(true);
    }

    setShowModal(false);
    modalForm.reset();
  };

  return (
    <SafeAreaView>
      {/* <KeyboardAwareScrollView contentContainerClassName="grow"> */}
      <View className="mt-7 flex-row justify-between">
        <Button className="bg-white">
          <ButtonText className="text-primary">Next</ButtonText>
        </Button>
        <Typography weight={500} className="text-[#0B0B0B]">
          Experience
        </Typography>
        <Button className="bg-white">
          <ButtonText className="text-primary">Back</ButtonText>
        </Button>
      </View>

      <View className="mt-7 gap-4 px-4">
        {!isFlatListView ? (
          fields.map((field, index) => (
            <View key={field.id} className="gap-4">
              <ControlledInput
                name={`experience.${index}.companyName`}
                control={control}
                label="Company Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
              />

              <ControlledInput
                name={`experience.${index}.role`}
                control={control}
                label="Job/Role Title"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
              />
              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <ControlledInput
                    name={`experience.${index}.joinDate`}
                    control={control}
                    label="Joining Date"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
                <View className="flex-1">
                  <ControlledInput
                    name={`experience.${index}.LeaveDate`}
                    control={control}
                    label="Leaving"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
              </View>

              <Locations control={control} />
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
                        {item.currentWorking}
                      </Typography>
                      <Typography color="body" weight={400} type="subtext">
                        {item.joinDate} - {item.LeaveDate}
                      </Typography>
                    </View>

                    {/* Right Section: Edit & Delete Buttons */}
                    <View className="flex-row gap-1">
                      {/* Edit Button */}
                      <Pressable
                        onPress={() => {
                          modalForm.reset({
                            addExperience: {
                              currentWorking: item.currentWorking || '',
                              companyName: item.companyName || '',
                              joinDate: item.joinDate || '',
                              LeaveDate: item.LeaveDate || '',
                              role: item.role || '',
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
            Add Experience
          </ButtonText>
        </Button>
      </View>
      {/* </KeyboardAwareScrollView> */}

      {/* Modal for Adding New Experience */}
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
                Add New Experience
              </Typography>

              {/* Modal Form */}
              <ControlledInput
                name="addExperience.currentWorking"
                control={modalForm.control}
                label="Company Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <ControlledInput
                name="addExperience.companyName"
                control={modalForm.control}
                label="Job/Role Title"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />

              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <ControlledInput
                    name="addExperience.joinDate"
                    control={modalForm.control}
                    label="Joining Date"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
                  />
                </View>
                <View className="flex-1">
                  <ControlledInput
                    name="addExperience.LeaveDate"
                    control={modalForm.control}
                    label="Leaving Date"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
                  />
                </View>
              </View>

              {/* <Locations control={modalForm.control} /> */}

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
                  onPress={modalForm.handleSubmit(handleAddExperience)}
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
