import { type Control, useController } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

import { type PersonalDetailsProps } from '@/app/(authentication)/personal-details';

const local_data = [
  {
    value: '1',
    label: 'United States',
    image: {
      uri: 'https://flagcdn.com/w320/us.png',
    },
  },
  {
    value: '2',
    label: 'Canada',
    image: {
      uri: 'https://flagcdn.com/w320/ca.png',
    },
  },
  {
    value: '3',
    label: 'United Kingdom',
    image: {
      uri: 'https://flagcdn.com/w320/gb.png',
    },
  },
  {
    value: '4',
    label: 'Australia',
    image: {
      uri: 'https://flagcdn.com/w320/au.png',
    },
  },
  {
    value: '5',
    label: 'Germany',
    image: {
      uri: 'https://flagcdn.com/w320/de.png',
    },
  },
  {
    value: '10',
    label: 'France',
    image: {
      uri: 'https://flagcdn.com/w320/fr.png',
    },
  },
  {
    value: '20',
    label: 'Japan',
    image: {
      uri: 'https://flagcdn.com/w320/jp.png',
    },
  },
  {
    value: '30',
    label: 'Brazil',
    image: {
      uri: 'https://flagcdn.com/w320/br.png',
    },
  },
  {
    value: '40',
    label: 'India',
    image: {
      uri: 'https://flagcdn.com/w320/in.png',
    },
  },
  {
    value: '50',
    label: 'China',
    image: {
      uri: 'https://flagcdn.com/w320/cn.png',
    },
  },
];

export const Nationality = ({
  control,
}: {
  control: Control<PersonalDetailsProps>;
}) => {
  const { field } = useController({ control, name: 'nationality' });
  return (
    <View className="mt-3">
      <SelectCountry
        search
        maxHeight={300}
        data={local_data}
        imageField="image"
        labelField="label"
        valueField="value"
        value={field.value}
        style={styles.dropdown}
        iconStyle={styles.iconStyle}
        placeholder="Select country"
        searchPlaceholder="Search..."
        imageStyle={styles.imageStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onChange={(e) => {
          field.onChange(e.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 50,
    alignItems: 'flex-end',
  },
  imageStyle: {
    width: 28,
    height: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
