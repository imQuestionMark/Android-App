/* eslint-disable react/jsx-no-undef */
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
  Controller,
  type FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  Alert,
  BackHandler,
  FlatList,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  type AchivementFormData,
  AchivementFormSchema,
} from '@/components/basic-informations/achivements/schema';
import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BASE_PATH = '(protected)/(basic-information)';

type AchievementItemProps = {
  index: number;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
};

type AchievementListProps = {
  fields: FieldArrayWithId<AchivementFormData, 'achievement'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (params: {
    attachment: string | undefined;
    desc: string;
    index: number;
    title: string;
  }) => void;
  showModal: () => void;
};

type DefaultViewProps = {
  control: Control<AchivementFormData>;
  showModal: () => void;
};

type ModalProps = {
  control: Control<AchivementFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onUpsert: () => Promise<void>;
};

const defaultValues: AchivementFormData = {
  achievement: [
    {
      title: 'US',
      desc: '',
      attachment: '',
    },
  ],
  addAchievement: {
    title: '',
    desc: '',
    attachment: '',
  },
};

export default function Achievement() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  const router = useRouter();
  const pathname = usePathname();

  const currentScreen = pathname.slice(1) as WallScreen;

  const isLastStep = currentScreen === 'achievement';
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
      headerRight: () => <BasicHeaderButton label="Done" onPress={goNext} />,
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction, goBack, goNext, navigation]);

  const { control, getValues, resetField, setValue, trigger } =
    useForm<AchivementFormData>({
      defaultValues,
      resolver: zodResolver(AchivementFormSchema),
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'achievement',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hasAchievements = fields.length > 1;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addAchievement');
  }, [resetField]);

  const showModal = useCallback(() => setIsModalVisible(true), []);

  const handleAddOrEditAchivement = async () => {
    const achievementData = getValues('addAchievement');
    console.log({ achievementData });
    if (!achievementData) return console.log('achievement data is empty');

    const achievementFieldKeys = Object.keys(
      achievementData
    ) as (keyof typeof achievementData)[];

    const validateAllFields = await Promise.all(
      achievementFieldKeys.map((field) => trigger(`addAchievement.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, achievementData);
      setEditingIndex(null);
    } else {
      append(achievementData);
    }

    hideModal();
  };

  const handleEdit = ({
    title,
    desc,
    attachment,
    index,
  }: {
    attachment: string | undefined;
    desc: string;
    index: number;
    title: string;
  }) => {
    setValue('addAchievement.title', title);
    setValue('addAchievement.desc', desc);
    setValue('addAchievement.attachment', attachment);
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
        {hasAchievements ? (
          <AchievementList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
            showModal={showModal}
          />
        ) : (
          <DefaultView control={control} showModal={showModal} />
        )}
      </View>
      <AddAchievementModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onUpsert={handleAddOrEditAchivement}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const AchievementList = ({
  fields,
  onEditPress,
  onDeletePress,
  showModal,
}: AchievementListProps) => {
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
        <AchievementListItem
          index={index}
          name={item.title}
          onEdit={() =>
            onEditPress({
              title: item.title,
              desc: item.desc,
              attachment: item.attachment,
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
              Add Achievements
            </ButtonText>
          </Button>
        );
      }}
    />
  );
};

const AchievementListItem = ({
  name,
  onEdit,
  onDelete,
  index,
}: AchievementItemProps) => {
  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Achievement',
      'Are you sure you want to delete this achievement?',
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
          name={`achievement.0.title`}
          control={control}
          label="Achievement Title"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
        />
        <Typography weight={500} className="mb-1 text-[14px] text-[#0B0B0B]">
          Description
        </Typography>
        <Controller
          control={control}
          name={`achievement.0.desc`}
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
          Achievement Attachments
        </Typography>

        <View className="flex-row">
          <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
            <ButtonText className="text-[14px] text-body" weight={400}>
              Add Link
            </ButtonText>
            <Ionicons name="link-sharp" size={16} color="black" />
          </Button>
        </View>
      </View>
      <Button
        className="mx-[47px] mb-8 h-[48px] rounded-[12px] border-dashed px-[13.5px]"
        variant="outline"
        onPress={showModal}
      >
        <Ionicons name="add" size={24} color="black" />
        <ButtonText weight={400} color="primary" className="text-[14px]">
          Add Achievements
        </ButtonText>
      </Button>
    </>
  );
};

const AddAchievementModal = ({
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
                {editingIndex ? 'Edit Achievement' : 'Add New Achievement'}
              </Typography>

              <ControlledInput
                name="addAchievement.title"
                control={control}
                label="Achievement Title"
                autoFocus
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
                name="addAchievement.desc"
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
                Achievement Attachments
              </Typography>

              <View className="flex-row">
                <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                  <ButtonText className="text-[14px] text-body" weight={400}>
                    Add Link
                  </ButtonText>
                  <Ionicons name="link-sharp" size={16} color="black" />
                </Button>
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
