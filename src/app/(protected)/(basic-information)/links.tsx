/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  BackHandler,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
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

export default function Links() {
  const { control, resetField, getValues, trigger, setFocus } =
    useForm<LinksFormData>({
      defaultValues: {
        links: [
          { label: 'LinkedIn', url: 'rishab@linkedin.com' },
          { label: 'GitHub', url: 'github.com/bonitoflakes' },
        ],
        newlinks: 'test',
      },
      resolver: zodResolver(LinksFormSchema),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const lastField = fields.length;

  const [showModal, setShowModal] = useState(false);

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

  const handleAddLink = async () => {
    const isValid = await trigger('newlinks');
    if (!isValid) return console.log('isValid', isValid);

    const newLabel = getValues('newlinks');

    append({ label: newLabel, url: '' });
    setShowModal(false);

    // @HACK To wait till react re-renders before focussing on the input
    setTimeout(() => {
      setFocus(`links.${lastField}.url`);
    }, 0);

    resetField('newlinks');
  };

  const handleCancel = () => {
    resetField('newlinks');
    setShowModal(false);
  };

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="grow"
      keyboardShouldPersistTaps="handled"
      bottomOffset={100}
      showsVerticalScrollIndicator={false}
    >
      <View
        className="grow bg-white"
        style={{
          paddingBottom: insets.bottom,
        }}
      >
        <View className="justify-between gap-4">
          {fields.map((field, index) => (
            <View key={field.id} className="relative w-full">
              <ControlledInput
                key={field.id}
                name={`links.${index}.url`}
                control={control}
                numberOfLines={1}
                label={field.label}
                labelClassName="text-[14px] text-[#0B0B0B]"
                inputClassName="border border-[#0000001A] pr-10"
              />
              {index > 1 && (
                <Button
                  variant="icon"
                  onPress={() => remove(index)}
                  className="absolute right-3 top-2/3 -translate-y-1/2 border-0 p-2"
                >
                  <Ionicons name="trash" size={20} color="red" />
                </Button>
              )}
            </View>
          ))}

          <Button
            className="mx-[47px] h-[48px] rounded-[12px] border-dashed px-[13.5px]"
            variant="outline"
            onPress={() => setShowModal(true)}
          >
            <Ionicons name="add" size={24} color="#0400D1" />
            <ButtonText className="font-poppins-regular text-[14px] text-primary">
              Add Links
            </ButtonText>
          </Button>
        </View>

        <Modal
          transparent
          visible={showModal}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View className="flex-1 items-center justify-center px-6">
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                  <Typography
                    weight={600}
                    className="mb-4 text-lg text-[#0B0B0B]"
                  >
                    Add New Link
                  </Typography>

                  <ControlledInput
                    name="newlinks"
                    control={control}
                    autoFocus
                    placeholder="Enter label (e.g., Portfolio, Twitter)"
                    inputClassName="border border-[#0000001A]"
                  />

                  <View className="mt-4 flex-row justify-between">
                    <Button
                      className="bg-gray-300 mr-2 flex-1 border border-[#0000001A]"
                      onPress={handleCancel}
                    >
                      <ButtonText className="text-black">Cancel</ButtonText>
                    </Button>

                    <Button
                      className="ml-2 flex-1 bg-primary"
                      onPress={handleAddLink}
                    >
                      <ButtonText className="text-white">Add</ButtonText>
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
}
