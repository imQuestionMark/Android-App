/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  FlatList,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Locations } from '@/components/basic-informations/education/components/location';
import {
  type EducationFormData,
  EducationFormSchema,
  type IEducationItem,
} from '@/components/basic-informations/education/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
import { useWallNavigationFlow } from '@/lib/hooks/(basic-information)/use-navigation-flow';

const defaultValues: EducationFormData = {
  education: [
    {
      intName: 'Loyola',
      FOS: 'BCA',
      startyear: '2019',
      endyear: '2022',
      GPA: '4.2',
      locations: 'Chennai',
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
  addEducation: {
    intName: '',
    FOS: '',
    startyear: '',
    endyear: '',
    GPA: '',
    locations: '',
  },
};

export default function Education() {
  useWallNavigationFlow();

  const { control, getValues, trigger, resetField, setValue } =
    useForm<EducationFormData>({
      defaultValues,
      resolver: zodResolver(EducationFormSchema),
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'education',
  });

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hideModal = useCallback(() => {
    setShowModal(false);
    setEditingIndex(null);
    resetField('addEducation');
  }, [resetField]);

  const handleAddOrEditEducation = async () => {
    const educationData = getValues('addEducation');
    console.log({ educationData });
    if (!educationData) return console.log('Education data is empty');

    const educationFieldKeys = Object.keys(
      educationData
    ) as (keyof typeof educationData)[];

    const validateAllFields = await Promise.all(
      educationFieldKeys.map((field) => trigger(`addEducation.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, educationData);
      setEditingIndex(null);
    } else {
      append(educationData);
    }

    hideModal();
  };

  const isFlatListView = fields.length > 1;
  const insets = useSafeAreaInsets();

  const handleEditPress = (index: number) => {
    const value = getValues(`education.${index}`);
    setValue('addEducation', value);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeletePress = (index: number) => {
    remove(index);
  };

  return (
    <View
      className="grow"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <View className="grow gap-4">
        {isFlatListView && (
          <EducationList
            fields={fields}
            onDeletePress={handleDeletePress}
            onEditPress={handleEditPress}
          />
        )}

        {!isFlatListView && <DefaultView control={control} />}

        <Button
          className="mx-[47px] h-[48px] rounded-[12px] border-dashed px-[13.5px]"
          variant="outline"
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={15} color="black" />
          <ButtonText className="font-poppins-regular text-[14px] text-primary">
            Add Education
          </ButtonText>
        </Button>

        <AddEducationModal
          control={control}
          onUpsert={handleAddOrEditEducation}
          editingIndex={editingIndex}
          hideModal={hideModal}
          showModal={showModal}
        />
      </View>
    </View>
  );
}

type IEducationListProps = {
  fields: FieldArrayWithId<EducationFormData, 'education'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (index: number) => void;
};

const EducationList = ({
  fields,
  onEditPress,
  onDeletePress,
}: IEducationListProps) => {
  return (
    <FlatList
      data={fields}
      className="flex-1 "
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <EducationListItem
          index={index}
          item={item}
          onEdit={() => onEditPress(index)}
          onDelete={() => onDeletePress(index)}
        />
      )}
      ItemSeparatorComponent={() => (
        <View className="bg-gray-400 mb-2 h-px w-full" />
      )}
    />
  );
};

type IEducationItemProps = {
  index: number;
  item: IEducationItem;
  onDelete: () => void;
  onEdit: () => void;
};

const EducationListItem = ({
  item,
  index,
  onEdit,
  onDelete,
}: IEducationItemProps) => {
  return (
    <View
      className="relative mx-[3px] my-1 rounded-lg bg-white px-4 py-3"
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 1px 5px 1px,',
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Typography weight={600} color="body" className="text-lg">
            {item.intName}
          </Typography>
          <Typography color="body" weight={400} type="subtext">
            {item.startyear} - {item.endyear}
          </Typography>
        </View>

        <View className="flex-row gap-1">
          <Button variant="icon" onPress={onEdit} className="border-0">
            <Ionicons name="pencil" size={15} color="black" />
          </Button>

          {index !== 0 && (
            <Button variant="icon" onPress={onDelete} className="border-0">
              <Ionicons name="trash-bin" size={15} color="black" />
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const DefaultView = ({ control }: { control: Control<EducationFormData> }) => {
  return (
    <>
      <View className="gap-4">
        <ControlledInput
          name={`education.0.intName`}
          control={control}
          label="Institution Name"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8 "
        />
        <ControlledInput
          name={`education.0.FOS`}
          control={control}
          label="Field of Study"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
        />
        <View className="flex-row gap-x-4">
          <View className="flex-1">
            <ControlledInput
              name={`education.0.startyear`}
              control={control}
              label="Start Year"
              labelClassName="text-[14px] text-[#0B0B0B]"
              inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
            />
          </View>
          <View className="flex-1">
            <ControlledInput
              name={`education.0.endyear`}
              control={control}
              label="End Year"
              labelClassName="text-[14px] text-[#0B0B0B]"
              inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
            />
          </View>
        </View>

        <ControlledInput
          name={`education.0.GPA`}
          control={control}
          label="GPA/Grade"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
        />
        <Locations control={control} name={`education.0.locations`} />
      </View>
    </>
  );
};

type IAddEducationModalProps = {
  control: Control<EducationFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  onUpsert: () => void;
  showModal: boolean;
};

const AddEducationModal = ({
  control,
  showModal,
  hideModal,
  onUpsert,
  editingIndex,
}: IAddEducationModalProps) => {
  return (
    <Modal
      transparent
      visible={showModal}
      animationType="fade"
      onRequestClose={hideModal}
    >
      <KeyboardAvoidingView className="flex-1">
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center px-3">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full gap-4 rounded-2xl bg-white p-6">
                <Typography
                  weight={600}
                  className="mb-4 text-lg text-[#0B0B0B]"
                >
                  {editingIndex ? 'Edit Education' : 'Add New Education'}
                </Typography>

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

                <View className="mt-4 flex-row justify-between">
                  <Button
                    className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                    onPress={hideModal}
                  >
                    <ButtonText className="text-black">Cancel</ButtonText>
                  </Button>

                  <Button className="ml-2 flex-1 bg-primary" onPress={onUpsert}>
                    <ButtonText className="text-white">
                      {editingIndex ? 'Save' : 'Add'}
                    </ButtonText>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};
