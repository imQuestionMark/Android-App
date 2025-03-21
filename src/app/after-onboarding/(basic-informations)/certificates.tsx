import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { FlatList, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  type CertificateFormData,
  CertificateFormSchema,
} from '@/components/basic-informations/certificate/schema';
import {
  Button,
  ButtonText,
  ControlledInput,
  Typography,
} from '@/components/ui';

export default function Certificate() {
  const { control, getValues, resetField, setValue, trigger } =
    useForm<CertificateFormData>({
      resolver: zodResolver(CertificateFormSchema),
      defaultValues: {
        certificate: [
          {
            certificateName: '',
          },
          {
            certificateName: '',
          },
        ],
        addCertificate: {
          certificateName: 'as',
        },
      },
      mode: 'all',
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'certificate',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const hideModal = () => {
    setIsModalVisible(false);
    setEditingIndex(null);
    resetField('addCertificate');
  };
  const showModal = () => setIsModalVisible(true);

  const handleAddOrEditCertificate = async () => {
    const isValid = await trigger('addCertificate');
    if (!isValid) return;

    const { certificateName } = getValues().addCertificate;
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

  return (
    <SafeAreaView className="grow bg-white">
      <View className="mt-7 gap-4 px-4">
        {fields.length > 1 ? (
          <CertificateFlatList
            fields={fields}
            onEditPress={handleEdit}
            onDeletePress={handleDelete}
          />
        ) : (
          fields.map(({ id }, index) => (
            <DefaultView
              control={control}
              fieldID={id}
              index={index}
              key={index}
            />
          ))
        )}

        <Button
          className="mx-[47px] h-[48px] rounded-[12px] border-dashed px-[13.5px]"
          variant="outline"
          onPress={showModal}
        >
          <Ionicons name="add" size={24} color="black" />
          <ButtonText weight={400} color="primary" className="text-[14px]">
            Add Certificates
          </ButtonText>
        </Button>
      </View>

      <AddCertModal
        control={control}
        editingIndex={editingIndex}
        hideModal={hideModal}
        onPress={handleAddOrEditCertificate}
        isModalVisible={isModalVisible}
      />
    </SafeAreaView>
  );
}

const CertificateFlatList = ({
  fields,
  onEditPress,
  onDeletePress,
}: {
  fields: FieldArrayWithId<CertificateFormData, 'certificate', 'id'>[];
  onDeletePress: (index: number) => void;
  onEditPress: ({
    certificateName,
    index,
  }: {
    certificateName: string;
    index: number;
  }) => void;
}) => {
  return (
    <FlatList
      data={fields}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View className="shadow-gray-200 relative mb-1 rounded-lg bg-white px-4 py-3 shadow-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Typography weight={600} color="body" className="text-lg">
                {item.certificateName}
              </Typography>
              <Typography color="body" weight={400} type="subtext">
                issue date
              </Typography>
            </View>

            <View className="flex-row gap-1">
              <Button
                onPress={() =>
                  onEditPress({
                    certificateName: item.certificateName,
                    index,
                  })
                }
                variant="ghost"
                className="p-2"
              >
                <Ionicons name="pencil" size={15} color="black" />
              </Button>

              {index !== 0 && (
                <Button
                  variant="ghost"
                  onPress={() => onDeletePress(index)}
                  className="p-2"
                >
                  <Ionicons name="trash-bin" size={15} color="black" />
                </Button>
              )}
            </View>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View className="mb-2 h-px w-full shadow-md" />
      )}
    />
  );
};

const DefaultView = ({
  control,
  fieldID,
  index,
}: {
  control: Control<CertificateFormData>;
  fieldID: string;
  index: number;
}) => {
  return (
    <View key={fieldID} className="gap-4">
      <ControlledInput
        name={`certificate.${index}.certificateName`}
        control={control}
        label="Certificate Name"
        labelClassName="text-[14px] text-[#0B0B0B]"
        inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
      />

      <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
        Certificate Attachments
      </Typography>

      <View className="flex-x-4  flex-row">
        <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
          <ButtonText className="text-[14px] text-body" weight={400}>
            Add Link
          </ButtonText>
          <Ionicons name="link-sharp" size={16} color="black" />
        </Button>
      </View>
    </View>
  );
};

const AddCertModal = ({
  isModalVisible,
  hideModal,
  control,
  onPress,
  editingIndex,
}: {
  control: Control<CertificateFormData>;
  editingIndex: null | number;
  hideModal: () => void;
  isModalVisible: boolean;
  onPress: () => Promise<void>;
}) => {
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
            <View className="w-full gap-4 rounded-2xl bg-white p-6 shadow-lg">
              <Typography weight={600} className="mb-4 text-lg text-[#0B0B0B]">
                Add New Certificate
              </Typography>

              <ControlledInput
                name="addCertificate.certificateName"
                control={control}
                label="Certificate Name"
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

                <Button className="ml-2 flex-1 bg-primary" onPress={onPress}>
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
