import { forwardRef } from 'react';
import { I18nManager, Text as RNText } from 'react-native';
import { StyleSheet, type TextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textStyles = tv({
  base: 'text-[16px] leading-[24px] font-poppins',
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
  },
  defaultVariants: {
    type: 'paragraph',
    color: 'body',
  },
});

type TextVariants = VariantProps<typeof textStyles>;

type TypographyProps = TextProps &
  TextVariants & {
    children: React.ReactNode;
    className?: string;
  };

const Text = forwardRef<RNText, TypographyProps>(
  ({ type, color, className, children, style, ...props }, ref) => {
    return (
      <RNText
        ref={ref}
        className={textStyles({ type, color, className })}
        style={StyleSheet.flatten([
          { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
          style,
        ])}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

export default Text;
