import { I18nManager, Text as RNText } from 'react-native';
import { type TextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textStyles = tv({
  base: 'font-poppins text-[16px] leading-[24px]',
  variants: {
    type: {
      heading: 'font-poppins-semibold text-[22px] leading-[33px]',
      subtext: 'font-poppins text-[14px] leading-[21px]',
      label: 'font-poppins-medium text-[14px] leading-[21px]',
      placeholder: 'font-poppins-medium text-[13px] leading-[19.5px]',
      paragraph: 'font-poppins text-[12px] leading-[18px]',
    },
  },
});

type TextVariants = VariantProps<typeof textStyles>;

type TypographyProps = TextProps &
  TextVariants & {
    children: React.ReactNode;
    className?: string;
  };

const Text = ({
  type = 'paragraph',
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <RNText
      className={textStyles({ type, className })}
      {...props}
      style={{ writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}
    >
      {children}
    </RNText>
  );
};

export default Text;
