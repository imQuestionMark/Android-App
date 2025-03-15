/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useState } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Company } from '@/components/basic-informations/projects/components/company';
import {
  type ProjectFormData,
  ProjectFormSchema,
} from '@/components/basic-informations/projects/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Project() {
  const { control } = useForm<ProjectFormData>({
    defaultValues: {
      project: [
        {
          companyName: '',
          projectTitle: '',
          client: '',
          workFrom: '',
          workTo: '',
          projectDesc: '',
          probSolved: '',
          skills: 'typer',
          projectLink: '',
        },
      ],
    },
    resolver: zodResolver(ProjectFormSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'project',
  });

  const [showModal, setShowModal] = useState(false);
  const [isFlatListView, setIsFlatListView] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  // Modal form for adding new education
  const modalForm = useForm({
    defaultValues: {
      addProject: {
        companyName: '',
        projectTitle: '',
        client: '',
        workFrom: '',
        workTo: '',
        projectDesc: '',
        probSolved: '',
        skills: 'typer',
        projectLink: '',
      },
    },
  });

  const handleAddProject = () => {
    const modalData = modalForm.getValues();
    const projectData = modalData.addProject || modalData;
    if (
      !projectData.companyName ||
      !projectData.projectTitle ||
      !projectData.client ||
      !projectData.workFrom ||
      !projectData.workTo ||
      !projectData.projectDesc ||
      !projectData.probSolved ||
      !projectData.skills ||
      !projectData.projectLink
    ) {
      return;
    }

    const formattedData = {
      companyName: projectData.companyName,
      projectTitle: projectData.projectTitle,
      client: projectData.client,
      workFrom: projectData.workFrom,
      workTo: projectData.workTo,
      projectDesc: projectData.projectDesc,
      probSolved: projectData.probSolved,
      skills: projectData.skills,
      projectLink: projectData.projectLink,
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
      <KeyboardAwareScrollView contentContainerClassName="grow">
        <View className="mt-7 flex-row justify-between">
          <Button className="bg-white">
            <ButtonText className="text-primary">Back</ButtonText>
          </Button>
          <Typography weight={500} className="text-[#0B0B0B]">
            Projects
          </Typography>
          <Button className="bg-white">
            <ButtonText className="text-primary">Next</ButtonText>
          </Button>
        </View>

        <View className="mt-7 gap-4 px-4">
          {!isFlatListView ? (
            fields.map((field, index) => (
              <View key={field.id} className="gap-4">
                <Company control={control} />
                <ControlledInput
                  name={`project.${index}.projectTitle`}
                  control={control}
                  label="Project Title"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />
                <ControlledInput
                  name={`project.${index}.client`}
                  control={control}
                  label="Client"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />
                <View className="flex-row gap-x-4">
                  <View className="flex-1">
                    <ControlledInput
                      name={`project.${index}.workFrom`}
                      control={control}
                      label="Worked From"
                      labelClassName="text-[14px] text-[#0B0B0B]"
                      inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                    />
                  </View>
                  <View className="flex-1">
                    <ControlledInput
                      name={`project.${index}.workTo`}
                      control={control}
                      label="Worked To"
                      labelClassName="text-[14px] text-[#0B0B0B]"
                      inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                    />
                  </View>
                </View>
                <Typography
                  weight={500}
                  className="mb-1 text-[14px] text-[#0B0B0B]"
                >
                  Project Description
                </Typography>
                <Controller
                  control={control}
                  name={`project.${index}.projectDesc`}
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
                          placeholder="Write about your project description and what’s your role in the project."
                        />
                        <Typography
                          weight={400}
                          className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                        >
                          Maximum 500 words
                        </Typography>
                      </View>
                    );
                  }}
                />
                <View className="flex-row">
                  <Typography
                    weight={500}
                    className="mb-1 text-[14px] text-[#0B0B0B]"
                  >
                    Problem Solved
                  </Typography>
                  <Typography
                    weight={400}
                    className="text-[14px] text-[#6D6D6D]"
                  >
                    (Optional)
                  </Typography>
                </View>
                <Controller
                  control={control}
                  name={`project.${index}.probSolved`}
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
                          placeholder="Write about the major problem you have faced and how you have solved it."
                        />
                        <Typography
                          weight={400}
                          className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                        >
                          Maximum 250 words
                        </Typography>
                      </View>
                    );
                  }}
                />
                <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
                  Skills employed
                </Typography>
                <View className="flex-x-4  flex-row">
                  <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                    <Image
                      source={require('assets/add.svg')}
                      className="size-[24px]"
                    />
                    <ButtonText className="text-[14px] text-body" weight={400}>
                      Add Skills
                    </ButtonText>
                  </Button>
                </View>
                <ControlledInput
                  name={`project.${index}.projectLink`}
                  control={control}
                  label="Project Link"
                  //placeholder="Provide any demonstration link if you have any"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
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
                        <Typography
                          weight={600}
                          color="body"
                          className="text-lg"
                        >
                          {item.companyName}
                        </Typography>
                        <Typography color="body" weight={400} type="subtext">
                          {item.workFrom} - {item.workTo}
                        </Typography>
                      </View>

                      {/* Right Section: Edit & Delete Buttons */}
                      <View className="flex-row gap-1">
                        {/* Edit Button */}
                        <Pressable
                          onPress={() => {
                            modalForm.reset({
                              addProject: {
                                companyName: item.companyName || '',
                                projectTitle: item.projectTitle || '',
                                client: item.client || '',
                                workFrom: item.workFrom || '',
                                workTo: item.workTo || '',
                                projectDesc: item.projectDesc || '',
                                probSolved: item.probSolved || '',
                                skills: item.skills || '',
                                projectLink: item.projectLink || '',
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
              Add Project
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
              <View className="size-full gap-2 rounded-2xl bg-white p-4 shadow-lg">
                <Typography
                  weight={600}
                  className="mb-4 text-lg text-[#0B0B0B]"
                >
                  Add New Project
                </Typography>

                {/* Modal Form */}
                <Company control={control} />
                <ControlledInput
                  name={`addProject.projectTitle`}
                  control={control}
                  label="Project Title"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />
                <ControlledInput
                  name={`addProject.client`}
                  control={control}
                  label="Client"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />
                <View className="flex-row gap-x-4">
                  <View className="flex-1">
                    <ControlledInput
                      name={`addProject.workFrom`}
                      control={control}
                      label="Worked From"
                      labelClassName="text-[14px] text-[#0B0B0B]"
                      inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                    />
                  </View>
                  <View className="flex-1">
                    <ControlledInput
                      name={`addProject.workTo`}
                      control={control}
                      label="Worked To"
                      labelClassName="text-[14px] text-[#0B0B0B]"
                      inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                    />
                  </View>
                </View>
                <Typography
                  weight={500}
                  className="mb-1 text-[14px] text-[#0B0B0B]"
                >
                  Project Description
                </Typography>
                <Controller
                  control={control}
                  name={`addProject.projectDesc`}
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
                          placeholder="Write about your project description and what’s your role in the project."
                        />
                        <Typography
                          weight={400}
                          className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                        >
                          Maximum 500 words
                        </Typography>
                      </View>
                    );
                  }}
                />
                <View className="flex-row">
                  <Typography
                    weight={500}
                    className="mb-1 text-[14px] text-[#0B0B0B]"
                  >
                    Problem Solved
                  </Typography>
                  <Typography
                    weight={400}
                    className="text-[14px] text-[#6D6D6D]"
                  >
                    (Optional)
                  </Typography>
                </View>
                <Controller
                  control={control}
                  name={`addProject.probSolved`}
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
                          placeholder="Write about the major problem you have faced and how you have solved it."
                        />
                        <Typography
                          weight={400}
                          className={`text-[14px] ${isLimitExceeded ? 'text-red-500' : 'text-[#6D6D6D]'}`}
                        >
                          Maximum 250 words
                        </Typography>
                      </View>
                    );
                  }}
                />
                <View className="flex-x-4  flex-row">
                  <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                    <Image
                      source={require('assets/add.svg')}
                      className="size-[24px]"
                    />
                    <ButtonText className="text-[14px] text-body" weight={400}>
                      Add Skills
                    </ButtonText>
                  </Button>
                </View>
                <ControlledInput
                  name={`addProject.projectLink`}
                  control={control}
                  label="Project Link"
                  placeholder="Provide any demonstration link if you have any"
                  labelClassName="text-[14px] text-[#0B0B0B]"
                  inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
                />

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
                    onPress={modalForm.handleSubmit(handleAddProject)}
                  >
                    <ButtonText className="text-white">Add</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
