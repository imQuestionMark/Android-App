import { Platform, StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

export const dropdownStyles = tv({
  slots: {
    trigger: 'bg-blue border-1 h-[50px] rounded-lg border-[#0000001A] px-2',
    triggerText: 'text-base text-black',
    itemContainer: 'flex-row items-center gap-3 p-4',
    itemText: 'text-black',
  },
  variants: {
    selected: {
      true: {
        itemText: 'text-primary',
      },
    },
  },
});

export const styles = StyleSheet.create({
  dropdown: {
    height: 48,
    borderColor: '#0000001A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    borderWidth: 0,
  },
  containerStyles: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: Platform.OS === 'ios' ? -96 : 4,
  },
});
