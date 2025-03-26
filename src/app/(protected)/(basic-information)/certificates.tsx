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
  BackHandler,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  type CertificateFormData,
  CertificateFormSchema,
} from '@/components/basic-informations/certificate/schema';
import { BasicHeaderButton } from '@/components/basic-informations/header-buttons';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';
import { useWallStore, type WallScreen } from '@/lib/store/wall.slice';

type CertificateItemProps = {
  index: number;
  name: string;
  onDelete: () => void;
  onEdit: () => void;
};

type CertificateListProps = {
  fields: FieldArrayWithId<CertificateFormData, 'certificate'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (params: { certificateName: string; index: number }) => void;
  showModal: () => void;
};

type DefaultViewProps = {
  control: Control<CertificateFormData>;
  showModal: () => void;
};

type ModalProps = {
  control: Control<CertificateFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onUpsert: () => Promise<void>;
};

const defaultValues: CertificateFormData = {
  certificate: [
    {
      certificateName: 'first',
    },
    {
      certificateName: 'second',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: '',
    },
    {
      certificateName: 'last',
    },
  ],
  addCertificate: {
    certificateName: '',
  },
};

const BASE_PATH = '(protected)/(basic-information)';

const Certificate = () => {
  const { control, getValues, resetField, setValue, trigger } =
    useForm<CertificateFormData>({
      resolver: zodResolver(CertificateFormSchema),
      defaultValues,
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'certificate',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hasCertificates = fields.length > 1;

  const hideModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addCertificate');
  }, [resetField]);

  const showModal = useCallback(() => setIsModalVisible(true), []);

  const handleAddOrEditCertificate = async () => {
    const isValid = await trigger('addCertificate.certificateName');
    if (!isValid) return;

    const value = getValues('addCertificate');
    if (!value) return;

    const certificateName = value.certificateName;
    if (!certificateName) return;

    const formattedData = {
      certificateName,
    };

    if (editingIndex !== null) {
      update(editingIndex, formattedData);
    } else {
      append(formattedData);
    }

    hideModal();
  };

  const handleEdit = ({
    certificateName,
    index,
  }: {
    certificateName: string;
    index: number;
  }) => {
    setValue('addCertificate.certificateName', certificateName);
    setEditingIndex(index);
    showModal();
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

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
      headerRight: () => <BasicHeaderButton label="Next" onPress={goNext} />,
    });

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [backAction, goBack, goNext, navigation]);

  return (
    <View
      className="grow bg-white"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-1 gap-4">
        {hasCertificates ? (
          <CertificateList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
            showModal={showModal}
          />
        ) : (
          <DefaultView control={control} showModal={showModal} />
        )}
      </View>

      <AddCertModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onUpsert={handleAddOrEditCertificate}
        isModalVisible={isModalVisible}
      />
    </View>
  );
};

const CertificateList = ({
  fields,
  onEditPress,
  onDeletePress,
  showModal,
}: CertificateListProps) => {
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
        <CertificateListItem
          index={index}
          name={item.certificateName}
          onEdit={() =>
            onEditPress({
              certificateName: item.certificateName,
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
              Add Certificates
            </ButtonText>
          </Button>
        );
      }}
    />
  );
};

const CertificateListItem = ({
  name,
  onEdit,
  onDelete,
  index,
}: CertificateItemProps) => {
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
          <Typography color="body" weight={400} type="subtext">
            issue date
          </Typography>
        </View>

        <View className="flex-row gap-1">
          <Button onPress={onEdit} variant="ghost" className="p-2">
            <Ionicons name="pencil" size={15} color="black" />
          </Button>

          {index !== 0 && (
            <Button variant="ghost" onPress={onDelete} className="p-2">
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
          name={`certificate.0.certificateName`}
          control={control}
          label="Certificate Name"
          labelClassName="text-[14px] text-[#0B0B0B]"
          inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
        />

        <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
          Certificate Attachments
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
          Add Certificates
        </ButtonText>
      </Button>
    </>
  );
};

const AddCertModal = ({
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
                {editingIndex ? 'Edit Certificate' : 'Add New Certificate'}
              </Typography>

              <ControlledInput
                name="addCertificate.certificateName"
                control={control}
                label="Certificate Name"
                autoFocus
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8  "
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

export default Certificate;
