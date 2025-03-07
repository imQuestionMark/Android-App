import React, { forwardRef, useCallback, useState } from 'react';
import { type FieldError } from 'react-hook-form';
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import type { TextInputProps as RNTextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as RNTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import { ErrorMessage } from './error-message';
import { Typography } from './text';

const inputTv = tv({
  slots: {
    label: 'mb-4 text-[16px]',
    input: 'h-[50px] rounded-md bg-white px-4 text-[16px] opacity-100',
    hint: 'mb-4 text-[12px]',
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
        input: 'opacity-50',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export type InputProps = RNTextInputProps & {
  disabled?: boolean;
  error?: FieldError;
  hint?: string;
  hintClassName?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
};

type InputLabelProps = Pick<InputProps, 'label' | 'testID'> & {
  className?: string;
};

type InputHintProps = Pick<InputProps, 'hint' | 'testID'> & {
  className?: string;
};

export const Input = forwardRef<RNTextInput, InputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    hint,
    labelClassName,
    inputClassName,
    hintClassName,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = useState(false);

  const onBlur = useCallback(() => setIsFocussed(false), []);
  const onFocus = useCallback(() => setIsFocussed(true), []);

  const styles = inputTv({
    error: Boolean(error),
    focused: isFocussed,
    disabled: Boolean(props.disabled),
  });

  return (
    <View>
      <InputLabel
        label={label}
        testID={testID}
        className={styles.label({ className: labelClassName })}
      />

      <InputHint
        hint={hint}
        testID={testID}
        className={styles.hint({ className: hintClassName })}
      />

      <RNTextInput
        {...inputProps}
        ref={ref}
        testID={testID}
        className={styles.input({ className: inputClassName })}
        placeholderClassName="text-body"
        placeholderTextColor="#5A5A5A"
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

const InputLabel = ({ label, testID, className }: InputLabelProps) => {
  return (
    <>
      {label && (
        <Typography
          color="main"
          weight={500}
          className={className}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </Typography>
      )}
    </>
  );
};

const InputHint = ({ hint, className, testID }: InputHintProps) => {
  if (!hint) return null;

  return (
    <Typography
      color="body"
      weight={500}
      className={className}
      testID={testID ? `${testID}-hint` : undefined}
    >
      {hint}
    </Typography>
  );
};

// Only for usage with react-hook-form

type ControlledInputProps<T extends FieldValues> = InputProps & {
  control: Control<T>;
  name: Path<T>;
};

export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, ...inputProps } = props;

  const {
    field: { ref, value, onBlur, onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <Input
      {...inputProps}
      ref={ref}
      value={value}
      error={error}
      onBlur={onBlur}
      onChangeText={onChange}
    />
  );
}
