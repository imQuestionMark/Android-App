/* eslint-disable react/jsx-no-undef */
/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import {
  type Control,
  Controller,
  type FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { useWallNavigationFlow } from '@/lib/hooks/(basic-information)/use-navigation-flow';

type SkillsItemProps = {
  index: number;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
  proficiency: string;
};

type SkillsListProps = {
  fields: FieldArrayWithId<SkillsFormData, 'skill'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (params: {
    exp: string;
    index: number;

    proficiency: string;
    skill: string;
  }) => void;
  showModal: () => void;
};

type DefaultViewProps = {
  control: Control<SkillsFormData>;
  showModal: () => void;
};

type ModalProps = {
  control: Control<SkillsFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onUpsert: () => Promise<void>;
};

const defaultValues: SkillsFormData = {
  skill: [
    {
      skill: 'Ballin',
      exp: 'one year',
      proficiency: 'Intermediate',
    },
    {
      skill: 'Ballin',
      exp: 'two year',
      proficiency: 'Intermediate',
    },
  ],
  addSkills: {
    skill: '',
    exp: '',
    proficiency: '',
  },
};

const options = ['Beginner', 'Intermediate', 'Expert'];

export default function Skills() {
  const insets = useSafeAreaInsets();
  useWallNavigationFlow();

  const { control, getValues, resetField, setValue, trigger } =
    useForm<SkillsFormData>({
      defaultValues,
      resolver: zodResolver(SkillsFormSchema),
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'skill',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hasSkills = fields.length > 1;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addSkills');
  }, [resetField]);

  const showModal = useCallback(() => setIsModalVisible(true), []);

  const handleAddOrEditSkills = async () => {
    const skillData = getValues('addSkills');
    console.log({ skillData });
    if (!skillData) return console.log('skill data is empty');

    const skillFieldKeys = Object.keys(skillData) as (keyof typeof skillData)[];

    const validateAllFields = await Promise.all(
      skillFieldKeys.map((field) => trigger(`addSkills.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, skillData);
      setEditingIndex(null);
    } else {
      append(skillData);
    }

    hideModal();
  };

  const handleEdit = ({
    skill,
    exp,
    proficiency,

    index,
  }: {
    exp: string;
    index: number;

    proficiency: string;
    skill: string;
  }) => {
    setValue('addSkills.skill', skill);
    setValue('addSkills.exp', exp);
    setValue('addSkills.proficiency', proficiency);

    setEditingIndex(index);
    showModal();
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  return (
    <View
      className="grow bg-white"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-1 gap-4">
        {hasSkills ? (
          <SkillsList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
            showModal={showModal}
          />
        ) : (
          <DefaultView control={control} showModal={showModal} />
        )}
      </View>
      <AddSkillsModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onUpsert={handleAddOrEditSkills}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const SkillsList = ({
  fields,
  onEditPress,
  onDeletePress,
  showModal,
}: SkillsListProps) => {
  return (
    <FlatList
      data={fields}
      className="flex-1"
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <SkillsListItem
          index={index}
          name={item.skill}
          proficiency={item.proficiency}
          onEdit={() =>
            onEditPress({
              skill: item.skill,
              exp: item.exp,
              proficiency: item.proficiency,
              index,
            })
          }
          onDelete={() => onDeletePress(index)}
        />
      )}
      ItemSeparatorComponent={() => <View className="mb-6 h-px w-full" />}
      ListFooterComponent={() => {
        return (
          <Button
            className="mx-3 mt-6 h-[48px] rounded-[12px] border-dashed"
            variant="outline"
            onPress={showModal}
          >
            <Ionicons name="add" size={24} color="#0400D1" />
            <ButtonText weight={400} color="primary" className="text-[14px]">
              Add Skills
            </ButtonText>
          </Button>
        );
      }}
    />
  );
};

const SkillsListItem = ({
  name,
  proficiency,
  onEdit,
  onDelete,
  index,
}: SkillsItemProps) => {
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Skills',
      'Are you sure you want to delete this skill?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  }, [onDelete]);

  return (
    <View
      className="mx-[3px] my-1 rounded-lg bg-white px-4 py-3 "
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 1px 5px 1px,',
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="grow ">
          <Typography weight={600} color="body" className="text-lg">
            {name} - {proficiency}
          </Typography>
        </View>

        <View className="flex-row gap-1">
          <Button onPress={onEdit} variant="ghost" className="p-2">
            <Ionicons name="pencil" size={15} color="black" />
          </Button>

          {index !== 0 && (
            <Button variant="ghost" onPress={handleDelete} className="p-2">
              <Ionicons name="trash-bin" size={15} color="black" />
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const DefaultView = ({ control, showModal }: DefaultViewProps) => {
  return (
    <>
      <View className="gap-4">
        <ControlledInput
          name="skill.0.skill"
          control={control}
          label="Skill"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
        />
        <ControlledInput
          name="skill.0.exp"
          control={control}
          label="Years of Experience"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
        />
        <Typography className=" text-[14px] text-black" weight={500}>
          Proficiency
        </Typography>

        <View className="flex-row justify-between px-4">
          {options.map((level) => (
            <Controller
              key={level}
              control={control}
              name="skill.0.proficiency"
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
      </View>
      <Button
        className="mx-[47px] mb-8 h-[48px] rounded-[12px] border-dashed px-[13.5px]"
        variant="outline"
        onPress={showModal}
      >
        <Ionicons name="add" size={24} color="black" />
        <ButtonText weight={400} color="primary" className="text-[14px]">
          Add Skills
        </ButtonText>
      </Button>
    </>
  );
};

const AddSkillsModal = ({
  isModalVisible,
  hideModal,
  control,
  onUpsert,
  editingIndex,
}: ModalProps) => {
  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={hideModal}
    >
      <TouchableWithoutFeedback onPress={hideModal}>
        <View className="flex-1 items-center justify-center bg-gray/30 px-3">
          <TouchableWithoutFeedback>
            <View className="w-full gap-4 rounded-2xl bg-white p-6 ">
              <Typography weight={600} className="mb-4 text-lg text-[#0B0B0B]">
                {editingIndex ? 'Edit Skills' : 'Add New Skills'}
              </Typography>

              <ControlledInput
                name="addSkills.skill"
                control={control}
                label="Skill"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <ControlledInput
                name="addSkills.exp"
                control={control}
                label="Years of Experience"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
              />
              <Typography className=" text-[14px] text-black" weight={500}>
                Proficiency
              </Typography>

              <View className="flex-row justify-between px-4">
                {options.map((level) => (
                  <Controller
                    key={level}
                    control={control}
                    name="addSkills.proficiency"
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

              <View className="mt-4 flex-row justify-between">
                <Button
                  className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                  onPress={hideModal}
                >
                  <ButtonText className="text-black">Cancel</ButtonText>
                </Button>

                <Button className="ml-2 flex-1 bg-primary" onPress={onUpsert}>
                  <ButtonText className="text-white">
                    {editingIndex !== null ? 'Edit ' : 'Add'}
                  </ButtonText>
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
