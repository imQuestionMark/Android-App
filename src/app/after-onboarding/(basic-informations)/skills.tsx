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
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  type SkillsFormData,
  SkillsFormSchema,
} from '@/components/basic-informations/skill/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Skills() {
  const { control, watch, setValue } = useForm<SkillsFormData>({
    defaultValues: {
      skill: [
        {
          skill: '',
          exp: '',
          proficiency: '',
        },
      ],
    },
    resolver: zodResolver(SkillsFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'skill',
  });

  const [showModal, setShowModal] = useState(false);
  const [isFlatListView, setIsFlatListView] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  // Modal form for adding new skill
  const modalForm = useForm({
    defaultValues: {
      addSkill: {
        skill: '',
        exp: '',
        proficiency: '',
      },
    },
  });

  const handleAddSkills = () => {
    console.log();
    const modalData = modalForm.getValues();
    const skillData = modalData.addSkill || modalData;
    if (!skillData.skill || !skillData.exp || !skillData.proficiency) {
      return;
    }

    const formattedData = {
      skill: skillData.skill,
      exp: skillData.exp,
      proficiency: skillData.proficiency,
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

  const options = ['Beginner', 'Intermediate', 'Expert'];

  return (
    <SafeAreaView>
      {/* <KeyboardAwareScrollView contentContainerClassName="grow"> */}

      <View className="mt-7 gap-4 px-4">
        {!isFlatListView ? (
          fields.map((field, index) => {
            const proficiency = watch(`skill.${index}.proficiency`);
            return (
              <View key={field.id} className="gap-4">
                <ControlledInput
                  name={`skill.${index}.skill`}
                  control={control}
                  label="Institution Name"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8 "
                />
                <ControlledInput
                  name={`skill.${index}.exp`}
                  control={control}
                  label="Field of Study"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />

                <Typography
                  className="mb-[-2px] text-[14px] text-black"
                  weight={500}
                >
                  Proficiency
                </Typography>
                <View className="flex-row gap-x-2 px-[12px] py-[8px]">
                  {options.map((level) => (
                    <Controller
                      key={level}
                      control={control}
                      name={`skill.${index}.proficiency`}
                      render={({ field: { onChange } }) => (
                        <Pressable
                          onPress={() => {
                            onChange(level);
                            setValue(`skill.${index}.proficiency`, level);
                          }}
                          className={`rounded-8 h-[36px] border border-[#0000001A] px-4 py-2 ${
                            proficiency === level ? 'bg-primary ' : 'bg-white'
                          }`}
                        >
                          <Typography
                            className={`text-[14px] ${
                              proficiency === level
                                ? 'text-white'
                                : 'text-black'
                            }`}
                            weight={500}
                          >
                            {level}
                          </Typography>
                        </Pressable>
                      )}
                    />
                  ))}
                </View>
              </View>
            );
          })
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
                        {item.skill} - {item.proficiency}
                      </Typography>
                    </View>

                    {/* Right Section: Edit & Delete Buttons */}
                    <View className="flex-row gap-1">
                      {/* Edit Button */}
                      <Pressable
                        onPress={() => {
                          modalForm.reset({
                            addSkill: {
                              skill: item.skill || '',
                              exp: item.exp || '',
                              proficiency: item.proficiency || '',
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
            Add Skills
          </ButtonText>
        </Button>
      </View>
      {/* </KeyboardAwareScrollView> */}

      {/* Modal for Adding New Skills */}
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
                Add New Skills
              </Typography>

              {/* Modal Form */}
              <ControlledInput
                name="addSkill.skill"
                control={modalForm.control}
                label="Institution Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <ControlledInput
                name="addSkill.exp"
                control={modalForm.control}
                label="Field of Study"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />

              <View className="flex-row justify-between p-4">
                {options.map((level) => (
                  <Controller
                    key={level}
                    control={modalForm.control}
                    name="addSkill.proficiency"
                    render={({ field: { onChange, value } }) => (
                      <Pressable
                        onPress={() => onChange(level)}
                        className={`rounded-8 h-[36px] border border-[#0000001A] px-4 py-2 ${
                          value === level ? 'bg-primary' : 'bg-white'
                        }`}
                      >
                        {' '}
                        <Typography
                          className={`text-[14px] ${
                            value === level ? 'text-white' : 'text-black'
                          }`}
                          weight={500}
                        >
                          {level}
                        </Typography>
                      </Pressable>
                    )}
                  />
                ))}
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
                  onPress={modalForm.handleSubmit(handleAddSkills)}
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
