import { type GestureResponderEvent, ScrollView, View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Button, Typography } from '@/components/ui';

type FilterOptions =
  | 'All'
  | 'Designing'
  | 'Development'
  | 'Marketing'
  | 'Sales';

type FilterComponentProps = {
  activeFilter: FilterOptions;
  filters: FilterOptions[];
  handleFilterPress: (filter: FilterOptions) => void;
};

type FilterPillProps = {
  isActive: boolean;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  activeFilter,
  handleFilterPress,
}) => {
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4"
      >
        {filters.map((filter) => (
          <FilterPill
            key={filter}
            label={filter}
            isActive={activeFilter === filter}
            onPress={() => handleFilterPress(filter)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const pillStyles = tv({
  slots: {
    pill: 'rounded-full px-6 py-2',
    text: 'font-poppins-regular text-[14px]',
  },
  variants: {
    isActive: {
      true: {
        pill: 'bg-primary',
        text: 'font-poppins-semibold text-white',
      },
      false: {
        pill: 'border border-blue-400 bg-white',
        text: 'text-primary',
      },
    },
  },
});

const { pill, text } = pillStyles();

const FilterPill: React.FC<FilterPillProps> = ({
  label,
  isActive,
  onPress,
}) => {
  return (
    <Button variant="link" className={pill({ isActive })} onPress={onPress}>
      <Typography className={text({ isActive })}>{label}</Typography>
    </Button>
  );
};
