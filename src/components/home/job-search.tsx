import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput as RNTextInput, View } from 'react-native';

import { Button } from '@/components/ui';

export const SearchBar = () => {
  return (
    <View
      className="my-3  flex-row items-center gap-[12px] rounded-[12px] bg-white px-4 py-2"
      style={{ boxShadow: '0px 1px 7px rgba(0, 0, 0, 0.15)' }}
    >
      <Ionicons name="search" size={24} color="#838383" />

      <RNTextInput
        className="flex-1 overflow-hidden border-0 bg-white font-poppins-regular text-[18px]"
        placeholder="Search Company, Job Profile, People"
        inputMode="search"
        multiline={false}
        numberOfLines={1}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        placeholderTextColor="#838383"
        style={{
          includeFontPadding: false,
        }}
      />

      <Button variant="icon" className="border-0">
        <Ionicons name="filter" size={24} color="#838383" />
      </Button>
    </View>
  );
};
