import { useCallback, useState } from 'react';
import { type Control, useController } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { type Variables } from '@/api/authentication/signup';

import { ErrorMessage, Typography } from '../ui';

const phoneInputStyles = tv({
  slots: {
    label: 'mb-2 text-[16px]',
    container:
      'flex-row items-center rounded-md border border-white bg-white px-4',
    divider: 'ml-2 h-1/2 w-[2px] rounded-full bg-body/20',
    input: 'grow py-[12px] pl-2 font-poppins-regular text-[16px]',
  },
  variants: {
    focused: {
      true: {
        container: 'border border-primary',
      },
    },
    error: {
      true: {
        container: 'border border-error',
      },
    },
  },
});

const styles = phoneInputStyles();

export const PhoneInput = ({ control }: { control: Control<Variables> }) => {
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({ control, name: 'phone' });
  const [isFocussed, setIsFocussed] = useState(false);

  const handleBlur = useCallback(() => {
    console.log('Input Blurred');
    setIsFocussed(false);
    onBlur();
  }, [onBlur]);

  const handleFocus = useCallback(() => {
    console.log('Input focussed');
    setIsFocussed(true);
  }, []);

  return (
    <View>
      <Typography color="main" className={styles.label()}>
        Enter your phone number
      </Typography>
      <View
        className={styles.container({
          focused: isFocussed,
          error: Boolean(error),
        })}
      >
        <Typography color="main">+91</Typography>
        <View className={styles.divider()} />
        <TextInput
          className={styles.input()}
          value={value}
          onChangeText={onChange}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="phone-pad"
          placeholder="9876543210"
        />
      </View>
      <ErrorMessage error={error} />
    </View>
  );
};
