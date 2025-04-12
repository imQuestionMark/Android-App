import { forwardRef } from 'react';
import { I18nManager, Text as RNText } from 'react-native';
import { StyleSheet, type TextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textStyles = tv({
  base: 'font-poppins text-[16px] leading-[24px]',
  variants: {
    type: {
      heading: 'font-poppins-semibold text-[22px] leading-[33px]',
      subtext: 'font-poppins-regular text-[14px] leading-[21px]',
      paragraph: 'font-poppins-regular text-[12px] leading-[18px]',
      label: 'font-poppins-medium text-[14px] leading-[21px]',
      placeholder: 'font-poppins-medium text-[13px] leading-[19.5px]',
    },
    color: {
      primary: 'text-primary',
      main: 'text-main',
      body: 'text-body',
      green: 'text-green',
      error: 'text-error',
    },
    weight: {
      100: 'font-poppins-thin',
      200: 'font-poppins-extralight',
      300: 'font-poppins-light',
      400: 'font-poppins-regular',
      500: 'font-poppins-medium',
      600: 'font-poppins-semibold',
      700: 'font-poppins-bold',
      800: 'font-poppins-extrabold',
      900: 'font-poppins-black',
    },
  },
  defaultVariants: {
    weight: 400,
    color: 'body',
  },
});

type TextVariants = VariantProps<typeof textStyles>;

export type TypographyProps = TextProps &
  TextVariants & {
    children: React.ReactNode;
    className?: string;
  };

export const Typography = forwardRef<RNText, TypographyProps>(
  ({ type, color, className, weight, children, style, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={textStyles({ type, color, weight, className })}
        style={StyleSheet.flatten([
          {
            writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
            includeFontPadding: false,
          },
          style,
        ])}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);
