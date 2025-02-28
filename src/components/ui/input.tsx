import { forwardRef, useCallback, useMemo, useState } from 'react';
import {
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  useController,
} from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import { ErrorMessage } from './error-message';
import { Typography } from './text';

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-2 font-poppins-regular text-[16px] ',
    input: 'h-[50px] rounded-md bg-white px-4 opacity-100',
    hint: 'mb-2 font-poppins-medium  text-sm text-body',
  },

  variants: {
    focused: {
      true: {
        input: 'border border-primary',
      },
    },
    error: {
      true: {
        input: 'border border-danger-600',
      },
    },
    disabled: {
      true: {
        input: '',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  disabled?: boolean;
  error?: FieldError;
  hint?: string;
  label?: string;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'setValueAs' | 'valueAsDate' | 'valueAsNumber'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends InputControllerType<T>,
    NInputProps {}

export const Input = forwardRef<NTextInput, NInputProps>((props, ref) => {
  const { label, error, testID, hint, ...inputProps } = props;
  const [isFocussed, setIsFocussed] = useState(false);

  const onBlur = useCallback(() => {
    console.log('Input Blurred');
    setIsFocussed(false);
  }, []);

  const onFocus = useCallback(() => {
    console.log('Input focussed');
    setIsFocussed(true);
  }, []);

  const styles = useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  return (
    <View className={styles.container()}>
      {label && (
        <Typography
          className={styles.label()}
          color="main"
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </Typography>
      )}

      {hint && (
        <Typography
          className={styles.hint()}
          testID={testID ? `${testID}-hint` : undefined}
        >
          {hint}
        </Typography>
      )}

      <NTextInput
        ref={ref}
        testID={testID}
        className={styles.input()}
        placeholderClassName="text-body"
        {...inputProps}
        onBlur={onBlur}
        onFocus={onFocus}
        style={StyleSheet.flatten([
          { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
          { textAlign: I18nManager.isRTL ? 'right' : 'left' },
          inputProps.style,
        ])}
      />

      <ErrorMessage error={error} />
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      onBlur={field.onBlur}
      error={fieldState.error}
    />
  );
}
