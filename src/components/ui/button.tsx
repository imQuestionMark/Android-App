import React from 'react';
import { createContext, useContext } from 'react';
import { Pressable, type PressableProps, Text, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonStyles = tv({
  slots: {
    base: 'flex-row items-center justify-center gap-2 rounded-lg disabled:cursor-not-allowed',
    text: 'text-center font-medium',
    iconContainer: 'shrink-0',
    spinner: '',
  },
  variants: {
    variant: {
      primary: {
        base: 'bg-primary',
        text: 'text-white',
      },
      secondary: {
        base: 'bg-gray-200',
        text: 'text-gray-900',
      },
      outline: {
        base: 'border border-primary',
        text: 'text-primary',
      },
      ghost: {
        base: 'bg-transparent',
        text: 'text-primary',
      },
    },
    size: {
      md: {
        base: 'h-9 px-3',
        text: 'text-sm',
        iconContainer: 'size-4',
      },
      icon: {
        base: 'size-10',
        iconContainer: 'size-5',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-50',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type TButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonContextValue = TButtonVariants & {
  isLoading?: boolean;
};

const ButtonContext = createContext<ButtonContextValue>({});

type ButtonProps = {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
} & PressableProps &
  TButtonVariants;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    { className, variant, size, isLoading, isDisabled, children, ...props },
    ref
  ) => {
    const buttonContext = {
      variant,
      size,
      isLoading,
      isDisabled,
    };

    const { base } = buttonStyles({
      variant,
      size,
      isDisabled,
    });

    return (
      <ButtonContext.Provider value={buttonContext}>
        <Pressable
          ref={ref}
          disabled={isDisabled}
          className={base({ className })}
          {...props}
        >
          {children}
        </Pressable>
      </ButtonContext.Provider>
    );
  }
);

type ButtonTextProps = {
  className?: string;
  children: React.ReactNode;
};

const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  ButtonTextProps
>(({ className, children }, ref) => {
  const { variant, size } = useContext(ButtonContext);
  const { text } = buttonStyles({ variant, size });

  return (
    <Text ref={ref} className={text({ className })}>
      {children}
    </Text>
  );
});

type ButtonIconProps = {
  className?: string;
  children: React.ReactNode;
};

const ButtonIcon = React.forwardRef<
  React.ElementRef<typeof View>,
  ButtonIconProps
>(({ className, children }, ref) => {
  const { variant, size } = useContext(ButtonContext);
  const { iconContainer } = buttonStyles({ variant, size });

  return (
    <View ref={ref} className={iconContainer({ className })}>
      {children}
    </View>
  );
});

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonIcon.displayName = 'ButtonIcon';

export { Button, ButtonIcon, ButtonText };
