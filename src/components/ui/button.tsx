import React from 'react';
import { createContext, useContext } from 'react';
import { Pressable, type PressableProps, type Text, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

import { Typography, type TypographyProps } from './text';

const buttonStyles = tv({
  slots: {
    base: 'flex-row items-center justify-center gap-2 rounded-md',
    text: 'text-center font-poppins-regular',
    iconContainer: 'shrink-0',
  },
  variants: {
    variant: {
      primary: {
        base: 'bg-primary',
        text: 'text-white',
      },
      outline: {
        base: 'border border-primary bg-white',
        text: 'text-primary',
      },
      ghost: {
        base: 'bg-transparent',
        text: 'text-primary',
      },
    },
    size: {
      lg: {
        base: '',
        text: 'font-poppins-semibold text-lg',
      },
      icon: {
        base: 'size-10',
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
    size: 'lg',
  },
});

type TButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonContextValue = TButtonVariants & {
  isLoading?: boolean;
};

const ButtonContext = createContext<ButtonContextValue>({});

type ButtonProps = PressableProps &
  TButtonVariants & {
    children?: React.ReactNode;
    className?: string;
  };

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, isDisabled, children, ...props }, ref) => {
  const buttonContext = {
    variant,
    size,
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
});

const ButtonText = React.forwardRef<
  React.ElementRef<typeof Text>,
  TypographyProps
>(({ className, children, ...props }, ref) => {
  const { variant, size } = useContext(ButtonContext);
  const { text } = buttonStyles({ variant, size });

  return (
    <Typography ref={ref} className={text({ className })} {...props}>
      {children}
    </Typography>
  );
});

type ButtonIconProps = {
  children: React.ReactNode;
  className?: string;
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
