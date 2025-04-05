/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, usePathname, useRouter } from 'expo-router';
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

import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
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
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

const BASE_PATH = '(protected)/(basic-information)';

type LinkItemProps = {
  index: number;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
};

type LinkListProps = {
  fields: FieldArrayWithId<LinksFormData, 'links'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (params: { index: number; label: string; url: string }) => void;
  showModal: () => void;
};

type DefaultViewProps = {
  control: Control<LinksFormData>;
  showModal: () => void;
};

type ModalProps = {
  control: Control<LinksFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onUpsert: () => Promise<void>;
};

const defaultValues: LinksFormData = {
  links: [
    {
      label: 'GitHub',
      url: 'iGit.com',
    },
  ],
  addLinks: {
    label: '',
    url: '',
  },
};

export default function Links() {
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

  useEffect(updateCurrentScreen, [updateCurrentScreen]);

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
    if (!navigation.isFocused()) return;

    navigation.setOptions({
      headerLeft: () => <BasicHeaderButton label="Back" onPress={goBack} />,
      headerRight: () => <BasicHeaderButton label="Next" onPress={goNext} />,
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction, goBack, goNext, navigation]);

  const { control, resetField, getValues, setValue, trigger } =
    useForm<LinksFormData>({
      defaultValues,
      resolver: zodResolver(LinksFormSchema),
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'links',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hasLinks = fields.length > 1;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addLinks');
  }, [resetField]);

  const showModal = useCallback(() => setIsModalVisible(true), []);

  const insets = useSafeAreaInsets();

  const handleAddOrEditLinks = async () => {
    const linkData = getValues('addLinks');
    console.log({ linkData });
    if (!linkData) return console.log('link data is empty');

    const linkFieldKeys = Object.keys(linkData) as (keyof typeof linkData)[];

    const validateAllFields = await Promise.all(
      linkFieldKeys.map((field) => trigger(`addLinks.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, linkData);
      setEditingIndex(null);
    } else {
      append(linkData);
    }

    hideModal();
  };

  const handleEdit = ({
    label,
    url,

    index,
  }: {
    index: number;
    label: string;
    url: string;
  }) => {
    setValue('addLinks.label', label);
    setValue('addLinks.url', url);
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
      <View className="flex-1 gap-4 ">
        {hasLinks ? (
          <LinksList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
            showModal={showModal}
          />
        ) : (
          <DefaultView control={control} showModal={showModal} />
        )}
      </View>
      <AddLinksModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onUpsert={handleAddOrEditLinks}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const LinksList = ({
  fields,
  onEditPress,
  onDeletePress,
  showModal,
}: LinkListProps) => {
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
        <LinksListItem
          index={index}
          name={item.label}
          onEdit={() =>
            onEditPress({
              label: item.label,
              url: item.url,
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
              Add Linkss
            </ButtonText>
          </Button>
        );
      }}
    />
  );
};

const LinksListItem = ({ name, onEdit, onDelete, index }: LinkItemProps) => {
  const handleDelete = useCallback(() => {
    Alert.alert('Delete Links', 'Are you sure you want to delete this Links?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ]);
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
          name={`links.0.url`}
          control={control}
          label="LinkedIn"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
        />
        <ControlledInput
          name={`links.0.label`}
          control={control}
          label="Github"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
        />
      </View>

      <Button
        className="mx-[47px] mb-8 h-[48px] rounded-[12px] border-dashed px-[13.5px]"
        variant="outline"
        onPress={showModal}
      >
        <Ionicons name="add" size={24} color="black" />
        <ButtonText weight={400} color="primary" className="text-[14px]">
          Add Links
        </ButtonText>
      </Button>
    </>
  );
};

const AddLinksModal = ({
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
                {editingIndex ? 'Edit Links' : 'Add New Links'}
              </Typography>

              <ControlledInput
                name={`addLinks.label`}
                control={control}
                label="Label"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
              />

              <ControlledInput
                name={`addLinks.url`}
                control={control}
                label="URL"
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
              />

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
