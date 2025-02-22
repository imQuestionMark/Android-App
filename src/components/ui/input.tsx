import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-2 font-poppins text-[16px] ',
    input: 'h-[50px] rounded-[6px] bg-white px-4 opacity-100',
    hint: 'mb-2 font-poppins text-sm font-medium text-[#5A5A5A]',
  },

  variants: {
    focused: {
      true: {
        input: 'rounded-[6px] bg-white opacity-100',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'rounded-[6px] bg-white opacity-100',
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
  error?: string;
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

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const { label, error, testID, hint, ...inputProps } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
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
        <Text
          className={styles.label()}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </Text>
      )}

      {hint && (
        <Text
          className={styles.hint()}
          testID={testID ? `${testID}-hint` : undefined}
        >
          {hint}
        </Text>
      )}
      <NTextInput
        ref={ref}
        onBlur={onBlur}
        testID={testID}
        onFocus={onFocus}
        className={styles.input()}
        placeholderTextColor={colors.neutral[400]}
        {...inputProps}
        style={StyleSheet.flatten([
          { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
          { textAlign: I18nManager.isRTL ? 'right' : 'left' },
          inputProps.style,
        ])}
      />
      {error && (
        <Text
          className="text-sm text-[#EE2F23]"
          testID={testID ? `${testID}-error` : undefined}
        >
          {error}
        </Text>
      )}
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
      error={fieldState.error?.message}
    />
  );
}
