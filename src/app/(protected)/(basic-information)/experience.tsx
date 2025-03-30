/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  Alert,
  BackHandler,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  type ExperienceFormData,
  ExperienceFormSchema,
} from '@/components/basic-informations/experience/schema';
import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BASE_PATH = '(protected)/(basic-information)';

type ExperienceItemProps = {
  index: number;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
};

type ExperienceListProps = {
  fields: FieldArrayWithId<ExperienceFormData, 'experience'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (params: {
    companyName: string;
    currentWorking: string;
    index: number;
    joinDate: string;
    LeaveDate: string;
    locations: string;
    role: string;
  }) => void;
  showModal: () => void;
};

type DefaultViewProps = {
  control: Control<ExperienceFormData>;
  showModal: () => void;
};

type ModalProps = {
  control: Control<ExperienceFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onUpsert: () => Promise<void>;
};

const defaultValues: ExperienceFormData = {
  experience: [
    {
      currentWorking: 'USA',
      companyName: 'Intellect',
      role: 'developer',
      joinDate: '2024',
      LeaveDate: '2026',
      locations: 'chennai',
    },
  ],
  addExperience: {
    currentWorking: '',
    companyName: '',
    role: '',
    joinDate: '2024',
    LeaveDate: '2026',
    locations: '',
  },
};

export default function Experience() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();

  const currentScreen = pathname.slice(1) as WallScreen;

  const isLastStep = currentScreen === 'experience';
  const { setCurrentStep, getPreviousScreen, getNextScreen } = useWallStore(
    (state) => state.actions
  );

  const updateCurrentScreen = useCallback(() => {
    setCurrentStep(currentScreen);
  }, [currentScreen, setCurrentStep]);

  useFocusEffect(updateCurrentScreen);

  const goBack = useCallback(() => {
    const prev = getPreviousScreen(currentScreen);
    if (prev) return router.dismissTo({ pathname: `/${BASE_PATH}/${prev}` });

    router.replace({ pathname: '/wall' });
  }, [currentScreen, getPreviousScreen, router]);

  const goNext = useCallback(() => {
    if (isLastStep) return router.replace({ pathname: '/wall' });

    const nextScreen = getNextScreen(currentScreen);
    if (nextScreen) router.push({ pathname: `/${BASE_PATH}/${nextScreen}` });
  }, [currentScreen, getNextScreen, isLastStep, router]);

  const backAction = useCallback(() => {
    console.log('Trapped Back Handler');
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BasicHeaderButton label="Back" onPress={goBack} />,
      headerRight: () => <BasicHeaderButton label="Next" onPress={goNext} />,
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction, goBack, goNext, navigation]);

  const { control, getValues, resetField, setValue, trigger } =
    useForm<ExperienceFormData>({
      defaultValues,
      resolver: zodResolver(ExperienceFormSchema),
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'experience',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hasExperience = fields.length > 0;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addExperience');
  }, [resetField]);

  const showModal = useCallback(() => setIsModalVisible(true), []);

  const handleAddOrEditAchivement = async () => {
    const experienceData = getValues('addExperience');
    console.log({ experienceData });
    if (!experienceData) return console.log('experience data is empty');

    const experienceFieldKeys = Object.keys(
      experienceData
    ) as (keyof typeof experienceData)[];

    const validateAllFields = await Promise.all(
      experienceFieldKeys.map((field) => trigger(`addExperience.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, experienceData);
      setEditingIndex(null);
    } else {
      append(experienceData);
    }

    hideModal();
  };

  const handleEdit = ({
    currentWorking,
    companyName,
    role,
    joinDate,
    LeaveDate,
    locations,
    index,
  }: {
    companyName: string;
    currentWorking: string;
    index: number;
    joinDate: string;
    LeaveDate: string;
    locations: string;
    role: string;
  }) => {
    setValue('addExperience.currentWorking', currentWorking);
    setValue('addExperience.companyName', companyName);
    setValue('addExperience.role', role);
    setValue('addExperience.LeaveDate', LeaveDate);
    setValue('addExperience.joinDate', joinDate);
    setValue('addExperience.locations', locations);
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
      <View className=" gap-4 px-4">
        {!hasExperience ? (
          <ExperienceList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
            showModal={showModal}
          />
        ) : (
          <DefaultView control={control} showModal={showModal} />
        )}
      </View>
      <AddExperienceModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onUpsert={handleAddOrEditAchivement}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const ExperienceList = ({
  fields,
  onEditPress,
  onDeletePress,
  showModal,
}: ExperienceListProps) => {
  return (
    <FlatList
      data={fields}
      className="flex-1"
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      getItemLayout={(_, index) => ({
        length: 75,
        offset: 75 * index,
        index,
      })}
      renderItem={({ item, index }) => (
        <ExperienceListItem
          index={index}
          name={item.currentWorking}
          onEdit={() =>
            onEditPress({
              currentWorking: item.currentWorking,
              companyName: item.companyName,
              role: item.role,
              joinDate: item.joinDate,
              LeaveDate: item.LeaveDate,
              locations: item.locations,
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
              Add Experiences
            </ButtonText>
          </Button>
        );
      }}
    />
  );
};

const ExperienceListItem = ({
  name,
  onEdit,
  onDelete,
  index,
}: ExperienceItemProps) => {
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Experience',
      'Are you sure you want to delete this experience?',
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
            {name}
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
          name={`experience.0.companyName`}
          control={control}
          label="Company Name"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
        />

        <ControlledInput
          name={`experience.0.role`}
          control={control}
          label="Job/Role Title"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
        />
        <View className="flex-row gap-x-4">
          <View className="flex-1">
            <ControlledInput
              name={`experience.0.joinDate`}
              control={control}
              label="Joining Date"
              labelClassName="text-[14px] text-[#0B0B0B]"
              inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
            />
          </View>
          <View className="flex-1">
            <ControlledInput
              name={`experience.0.LeaveDate`}
              control={control}
              label="Leaving"
              labelClassName="text-[14px] text-[#0B0B0B]"
              inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
            />
          </View>
        </View>

        {/* <Locations control={control} /> */}
      </View>
      <Button
        className="mx-[47px] mb-8 h-[48px] rounded-[12px] border-dashed px-[13.5px]"
        variant="outline"
        onPress={showModal}
      >
        <Ionicons name="add" size={24} color="black" />
        <ButtonText weight={400} color="primary" className="text-[14px]">
          Add Experiences
        </ButtonText>
      </Button>
    </>
  );
};

const AddExperienceModal = ({
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
                {editingIndex ? 'Edit Experience' : 'Add New Experience'}
              </Typography>

              <ControlledInput
                name={`addExperience.companyName`}
                control={control}
                label="Company Name"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
              />

              <ControlledInput
                name={`addExperience.role`}
                control={control}
                label="Job/Role Title"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
              />
              <View className="flex-row gap-x-4">
                <View className="flex-1">
                  <ControlledInput
                    name={`addExperience.joinDate`}
                    control={control}
                    label="Joining Date"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
                <View className="flex-1">
                  <ControlledInput
                    name={`addExperience.LeaveDate`}
                    control={control}
                    label="Leaving"
                    labelClassName="text-[14px] text-[#0B0B0B]"
                    inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
                  />
                </View>
              </View>

              {/* <Locations control={control} /> */}

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
