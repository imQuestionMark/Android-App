/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { useWallNavigationFlow } from '@/lib/hooks/(basic-information)/use-navigation-flow';

export default function Project() {
  useWallNavigationFlow();

  const { control, getValues, trigger, resetField, setValue } =
    useForm<ProjectFormData>({
      defaultValues: {
        project: [
          {
            companyName: 'rootquotient technologies limited',
            projectTitle: 'Avocado',
            client: 'Supreme',
            workFrom: '2022',
            workTo: '2021',
            projectDesc: '',
            probSolved: '',
            skills: '',
            projectLink: '',
          },
          {
            companyName: 'Fastlane',
            projectTitle: 'Avocado',
            client: 'Supreme',
            workFrom: '2022',
            workTo: '2025',
            projectDesc: '',
            probSolved: '',
            skills: '',
            projectLink: '',
          },
        ],
        addProject: {
          companyName: 'Intellect',
          projectTitle: 'Test add',
          client: 'test add',
          workFrom: '2022',
          workTo: '2025',
          projectDesc: 'asdfsadf sadf ',
          probSolved: '',
          skills: '',
          projectLink: 'link.com',
        },
      },
      resolver: zodResolver(ProjectFormSchema),
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'project',
  });

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingIndex(null);
    resetField('addProject');
  }, [resetField]);

  const handleAddOrEditProject = async () => {
    const data = getValues('addProject');
    if (!data) return console.log('Education data is empty');

    const educationFieldKeys = Object.keys(data) as (keyof typeof data)[];

    const validateAllFields = await Promise.all(
      educationFieldKeys.map((field) => trigger(`addProject.${field}`))
    );

    const isValid = validateAllFields.every(Boolean);
    if (!isValid) return console.log('Error present', !isValid);

    if (editingIndex !== null) {
      update(editingIndex, data);
      setEditingIndex(null);
    } else {
      append(data);
    }

    closeModal();
  };

  const onDeletePress = (index: number) => {
    console.log('Index to delete', index);
    remove(index);
  };

  const onEditPress = (index: number) => {
    const value = getValues(`project.${index}`);
    setValue('addProject', value);
    setEditingIndex(index);
    setShowModal(true);
  };

  const isFlatListView = fields.length > 1;
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-white"
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex-1">
        {isFlatListView && (
          <ProjectList
            fields={fields}
            onDeletePress={onDeletePress}
            onEditPress={onEditPress}
          />
        )}

        {!isFlatListView && <DefaultView control={control} />}

        <Button
          className="mx-[47px] my-4 h-[48px] rounded-[12px] border-dashed"
          variant="outline"
          onPress={() => setShowModal(true)}
        >
          <Ionicons name="add" size={24} color="#0400D1" />
          <ButtonText className="font-poppins-regular text-[14px] text-primary">
            Add Project
          </ButtonText>
        </Button>

        <ProjectModal
          control={control}
          showModal={showModal}
          closeModal={closeModal}
          isEditing={editingIndex}
          handleAddOrEditProject={handleAddOrEditProject}
        />
      </View>
    </View>
  );
}

type IProjectList = {
  fields: FieldArrayWithId<ProjectFormData, 'project'>[];
  onDeletePress: (index: number) => void;
  onEditPress: (index: number) => void;
};

const ProjectList = ({ fields, onDeletePress, onEditPress }: IProjectList) => {
  return (
    <FlatList
      data={fields}
      className="flex-1"
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ProjectListItem
          item={item}
          index={index}
          handleEdit={() => onEditPress(index)}
          handleDelete={() => onDeletePress(index)}
        />
      )}
      ItemSeparatorComponent={() => (
        <View className="bg-gray-400 shadow-gray-500 mb-2 h-px w-full" />
      )}
    />
  );
};

type IProjectListItem = {
  handleDelete: () => void;
  handleEdit: () => void;
  index: number;
  item: FieldArrayWithId<ProjectFormData, 'project'>;
};

const ProjectListItem = ({
  item,
  handleEdit,
  handleDelete,
  index,
}: IProjectListItem) => {
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
            {item.companyName}
          </Typography>
          <Typography color="body" weight={400} type="subtext">
            {item.workFrom} - {item.workTo}
          </Typography>
        </View>

        <View className="flex-row gap-1">
          <Button onPress={handleEdit} variant="ghost" className="p-2">
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

const DefaultView = ({ control }: { control: Control<ProjectFormData> }) => {
  return (
    <KeyboardAwareScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-10 gap-4"
      bottomOffset={100}
    >
      <Company control={control} name="project.0.companyName" />

      <ControlledInput
        name={`project.0.projectTitle`}
        control={control}
        label="Project Title"
        labelClassName="text-[14px] text-[#0B0B0B]"
        inputClassName="border border-[#0000001A] h-[48px] rounded-8"
      />

      <ControlledInput
        name={`project.0.client`}
        control={control}
        label="Client"
        labelClassName="text-[14px] text-[#0B0B0B]"
        inputClassName="border border-[#0000001A] h-[48px] rounded-8"
      />

      <View className="flex-row gap-x-4">
        <View className="flex-1">
          <ControlledInput
            name={`project.0.workFrom`}
            control={control}
            label="Worked From"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
        </View>

        <View className="flex-1">
          <ControlledInput
            name={`project.0.workTo`}
            control={control}
            label="Worked To"
            labelClassName="text-[14px] text-[#0B0B0B]"
            inputClassName="border border-[#0000001A] pr-10 h-[48px] rounded-8"
          />
        </View>
      </View>

      <ControlledInput
        control={control}
        name={`project.0.projectDesc`}
        label="Project Description"
        multiline
        labelClassName="text-[14px]"
        placeholder="Write about your project description and what's your role in the project."
        // onChangeText={debouncedValidation}
        inputClassName="text-gray-800  rounded-lg border border-[#0000001A] bg-white p-3 h-auto text-base"
        style={{ minHeight: 100, textAlignVertical: 'top' }}
      />

      <ControlledInput
        control={control}
        name={`project.0.probSolved`}
        label="Problem Solved (Optional)"
        multiline
        labelClassName="text-[14px]"
        placeholder="Write about the major problem you have faced and how you have solved it."
        // onChangeText={debouncedValidation}
        inputClassName="text-gray-800  rounded-lg border border-[#0000001A] bg-white p-3 h-auto text-base"
        style={{ minHeight: 100, textAlignVertical: 'top' }}
      />

      <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
        Skills employed
      </Typography>

      <View className="flex-row">
        <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
          <Ionicons name="add" size={24} color="#0400D1" />
          <ButtonText className="text-[14px] text-body" weight={400}>
            Add Skills
          </ButtonText>
        </Button>
      </View>

      <ControlledInput
        name={`project.0.projectLink`}
        control={control}
        label="Project Link"
        labelClassName="text-[14px] text-[#0B0B0B]"
        inputClassName="border border-[#0000001A] pr-10 h-[48px]rounded-8"
      />
    </KeyboardAwareScrollView>
  );
};

type IProjectModal = {
  closeModal: () => void;
  control: Control<ProjectFormData>;
  handleAddOrEditProject: () => void;
  isEditing: null | number;
  showModal: boolean;
};

const ProjectModal = ({
  control,
  showModal,
  closeModal,
  handleAddOrEditProject,
  isEditing,
}: IProjectModal) => {
  return (
    <Modal
      transparent
      visible={showModal}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex-1 items-center justify-center px-3">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="size-full gap-2 rounded-2xl bg-white p-4 shadow-lg">
                <Typography
                  weight={600}
                  className="mb-4 text-lg text-[#0B0B0B]"
                >
                  {isEditing ? 'Edit Project' : 'Add New Project'}
                </Typography>

                <Company control={control} name="addProject.companyName" />

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

                <ControlledInput
                  control={control}
                  name="addProject.projectDesc"
                  label="Project Description"
                  multiline
                  labelClassName="text-[14px]"
                  placeholder="Write about your project description and what's your role in the project."
                  // onChangeText={debouncedValidation}
                  inputClassName="text-gray-800  rounded-lg border border-[#0000001A] bg-white p-3 h-auto text-base"
                  style={{ minHeight: 100, textAlignVertical: 'top' }}
                />

                <ControlledInput
                  control={control}
                  name={`addProject.probSolved`}
                  label="Problem Solved (Optional)"
                  multiline
                  labelClassName="text-[14px]"
                  placeholder="Write about the major problem you have faced and how you have solved it."
                  // onChangeText={debouncedValidation}
                  inputClassName="text-gray-800  rounded-lg border border-[#0000001A] bg-white p-3 h-auto text-base"
                  style={{ minHeight: 100, textAlignVertical: 'top' }}
                />

                <Typography className="text-[14px] text-[#0B0B0B]" weight={500}>
                  Skills employed
                </Typography>

                <View className="flex-x-4  flex-row">
                  <Button className="rounded-8 h-[40px] border border-[#0000001A] bg-white px-[12px] py-[8px]">
                    <Ionicons name="add" size={24} color="#0400D1" />
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

                <View className="mt-4 flex-row justify-between">
                  <Button
                    className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                    onPress={closeModal}
                  >
                    <ButtonText className="text-black">Cancel</ButtonText>
                  </Button>

                  <Button
                    className="ml-2 flex-1 bg-primary"
                    onPress={handleAddOrEditProject}
                  >
                    <ButtonText className="text-white">
                      {isEditing ? 'Save' : 'Add'}
                    </ButtonText>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </Modal>
  );
};
