import { Platform, StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

export const dropdownStyles = tv({
  slots: {
    trigger: 'h-[50px] rounded-lg border border-white bg-white px-2',
    triggerText: 'text-base text-black',
    itemContainer: 'flex-row items-center gap-3 p-4',
    itemIcon: 'border-gray-300 rounded-xl border-[3px] bg-white',
    itemIconCheck: '',
    itemText: 'text-black',
  },
  variants: {
    selected: {
      true: {
        itemIcon: 'border-[#17A2B8] bg-primary',
        itemIconCheck: 'white',
        itemText: 'text-primary',
      },
      false: {
        itemIconCheck: 'none',
      },
    },
  },
});

export const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderWidth: 0.5,
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
    marginTop: Platform.OS === 'ios' ? -96 : 4,
  },
});
