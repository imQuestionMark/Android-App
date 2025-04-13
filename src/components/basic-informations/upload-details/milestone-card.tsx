import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import { type TStep } from '@/app/(protected)/(wall)/upload-details';
import { Typography } from '@/components/ui';

type IMilestoneCardProps = {
  active?: boolean;
  item: TStep;
};

const styles = tv({
  slots: {
    container: 'flex-1 rounded-xl border-[0.5px] border-primary p-4',
    title: 'text-[14px]',
    description: 'text-[14px]',
    iconContainer:
      'size-14 items-center justify-center rounded-full bg-[#929497]',
  },
  variants: {
    active: {
      true: {
        container: 'border-[#2800C9] bg-[#2800C9]',
        title: 'text-white',
        description: 'text-white',
        iconContainer: 'bg-[#2800C9]',
      },
    },
    completed: {
      true: {
        iconContainer: 'bg-green',
      },
    },
  },
});

const { container, description, title, iconContainer } = styles();

const MilestoneCard = ({ item }: IMilestoneCardProps) => {
  const router = useRouter();

  const active = item.active || false;
  const completed = item.completed || false;

  const onPress = () => {
    router.push(item.href);
  };

  return (
    <Pressable onPress={onPress}>
      <View className="flex-row gap-4 ">
        <View
          className={iconContainer({ active: active, completed: completed })}
        >
          <Ionicons name="book" size={24} color="white" />
        </View>

        {item.number < 8 && (
          <View className=" absolute bottom-0 left-6 top-[4.5rem] w-2 rounded-full bg-[#E8ECF2]" />
        )}

        <View className={container({ active: active })}>
          {active && (
            <Image
              source={require('assets/wall-pattern.png')}
              className=" absolute inset-0 "
              contentFit="cover"
            />
          )}

          <View className="gap-3">
            <Typography color="body" className={title({ active: active })}>
              #{item.number} {item.title}
            </Typography>

            <Typography
              className={description({ active: active })}
              color="main"
              weight={400}
            >
              {item.description}
            </Typography>
          </View>

          {active && (
            <View className="mt-5 flex-row items-center gap-4">
              <View className="h-[8px] flex-1 rounded-full bg-[#e0e0e0a8]" />
              <Typography className="text-white">
                {item.extraContent}
              </Typography>
            </View>
          )}

          {active && (
            <Svg
              width="67"
              fill="none"
              height="75"
              viewBox="0 0 68 75"
              className="absolute -right-4 -top-2"
            >
              <Path
                fill="transparent"
                strokeWidth={1}
                stroke="#fff"
                d="M50.5799 21.6416L50.3966 21.7278L50.443 21.925L52.8785 32.2863L52.9491 32.5867L53.2283 32.4553L61.6464 28.4932L66.6669 39.1059L55.8728 44.1862L55.6899 44.2723L55.7357 44.4691L58.5129 56.3838L47.4505 61.5902L44.6974 49.78L44.6272 49.4788L44.3474 49.6105L32.3903 55.2382L32.2074 55.3242L32.2533 55.5211L35.0307 67.4358L23.9683 72.6421L21.2152 60.8319L21.145 60.5308L20.8652 60.6625L10.4303 65.5737L5.40984 54.961L18.221 48.9316L18.4043 48.8453L18.3579 48.6482L15.9222 38.2869L15.8516 37.9865L15.5724 38.1179L5.35356 42.9272L0.333106 32.3148L12.8561 26.4207L13.0389 26.3347L12.9931 26.1379L10.3136 14.6165L21.376 9.40993L24.0311 20.8271L24.1012 21.1284L24.3811 20.9966L36.3385 15.3688L36.5213 15.2828L36.4755 15.086L33.7958 3.56446L44.8584 -1.64207L47.5136 9.77497L47.5836 10.0763L47.8635 9.94454L56.5698 5.84696L61.5901 16.4595L50.5799 21.6416ZM39.4047 27.2349L39.3341 26.9345L39.0548 27.0659L27.0974 32.6935L26.9142 32.7798L26.9605 32.9769L29.3963 43.3383L29.4669 43.6387L29.7461 43.5072L41.7032 37.8796L41.8865 37.7933L41.8402 37.5962L39.4047 27.2349Z"
              />
            </Svg>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default MilestoneCard;
