/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  type AchivementFormData,
  AchivementFormSchema,
} from '@/components/basic-informations/achivements/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Achievement() {
  const { control } = useForm<AchivementFormData>({
    defaultValues: {
      achivement: [
        {
          title: '',
          desc: '',
          attachment: '',
        },
      ],
    },
    resolver: zodResolver(AchivementFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'achivement',
  });

  const [showModal, setShowModal] = useState(false);
  const [isFlatListView, setIsFlatListView] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  // Modal form for adding new achivement
  const modalForm = useForm({
    defaultValues: {
      addAchivement: {
        title: '',
        desc: '',
        attachment: '',
      },
    },
  });

  const handleAddAchivement = () => {
    console.log();
    const modalData = modalForm.getValues();
    const achivementData = modalData.addAchivement || modalData;
    if (
      !achivementData.title ||
      !achivementData.desc ||
      !achivementData.attachment
    ) {
      return;
    }

    const formattedData = {
      title: achivementData.title,
      desc: achivementData.desc,
      attachment: achivementData.attachment,
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

      <View className="mt-7 gap-4 px-4">
        {!isFlatListView ? (
          fields.map((field, index) => (
            <View key={field.id} className="gap-4">
              <ControlledInput
                name={`achivement.${index}.title`}
                control={control}
                label="Achivement Title"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8 "
              />
              <Typography
                weight={500}
                className="mb-1 text-[14px] text-[#0B0B0B]"
              >
                Description
              </Typography>
              <Controller
                control={control}
                name={`achivement.${index}.desc`}
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

              <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
                Achivement Attachments
              </Typography>
              <View className="flex-x-4  flex-row">
                <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                  <ButtonText className="text-[14px] text-body" weight={400}>
                    Add Link
                  </ButtonText>
                  <Image
                    source={require('assets/addlink.svg')}
                    className="size-[16px]"
                  />
                </Button>
              </View>
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
                        {item.title}
                      </Typography>
                    </View>

                    {/* Right Section: Edit & Delete Buttons */}
                    <View className="flex-row gap-1">
                      {/* Edit Button */}
                      <Pressable
                        onPress={() => {
                          modalForm.reset({
                            addAchivement: {
                              title: item.title || '',
                              desc: item.desc || '',
                              attachment: item.attachment || '',
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
            Add Achivements
          </ButtonText>
        </Button>
      </View>
      {/* </KeyboardAwareScrollView> */}

      {/* Modal for Adding New Achivement */}
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
                Add New Achivement
              </Typography>

              {/* Modal Form */}
              <ControlledInput
                name="addAchivement.title"
                control={modalForm.control}
                label="Achivement Title"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <Typography
                weight={500}
                className="mb-1 text-[14px] text-[#0B0B0B]"
              >
                Description
              </Typography>
              <Controller
                control={control}
                name="addAchivement.desc"
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

              <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
                Achivement Attachments
              </Typography>
              <View className="flex-x-4  flex-row">
                <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                  <ButtonText className="text-[14px] text-body" weight={400}>
                    Add Link
                  </ButtonText>
                  <Image
                    source={require('assets/addlink.svg')}
                    className="size-[16px]"
                  />
                </Button>
              </View>

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
                  onPress={modalForm.handleSubmit(handleAddAchivement)}
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
