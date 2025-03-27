import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import GradientView from '@/components/onboarding/gradient-view';
import { Typography } from '@/components/ui';

const menuItems = [
  {
    id: 'account',
    title: 'Account',
    description: 'Personal Info Profile Picture',
    href: '/(profile)/account-details',
  },
  {
    id: 'activity',
    title: 'My Activity',
    description: 'You can view saved and applied jobs',
    href: '/(profile)/activity',
  },
  {
    id: 'preferences',
    title: 'General Preference',
    description: 'App preference, Common change, Themes',
    href: '/(profile)/general-preference',
  },
  {
    id: 'notifications',
    title: 'Notification Manage',
    description: 'Choose your Notification Preference',
    href: '/(profile)/notifications',
  },
  {
    id: 'privacy',
    title: 'Data Privacy & Protection',
    description: 'Enable/Disable your Private Information to be displayed.',
    href: '/(profile)/data-privacy',
  },
  {
    id: 'support',
    title: 'Help & Support',
    description:
      'Customer Support - 24*7 , Chat support, Customer call representative',
    href: '/(profile)/support',
  },
  {
    id: 'policy',
    title: 'Privacy Policy',
    description: 'Read our Privacy policy documentation.',
    href: '/(profile)/policy',
  },
];

//  extract the href into a type from all menutitems
type IProfileMenuItem =
  | 'account-details'
  | 'activity'
  | 'data-privacy'
  | 'general-preference'
  | 'notifications'
  | 'policy'
  | 'support';

const ProfileMenuItem = ({
  title,
  description,
  href,
}: {
  description: string;
  href: IProfileMenuItem;
  title: string;
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: href });
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        className="mb-7 rounded-[15px] bg-white px-7 py-[20px]"
        style={{
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 1px 5px 1px,',
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 gap-[3px]">
            <Typography weight={600} color="main" className="text-[18px]">
              {title}
            </Typography>
            <Typography weight={400} className="text-[14px] text-[#596574]">
              {description}
            </Typography>
          </View>
          <Image
            contentFit="contain"
            source={require('assets/profile-push-arrow.svg')}
            className="mt-[-18px] size-[24px]"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default function ProfileMain() {
  return (
    <GradientView edges={['top', 'left', 'right']}>
      <KeyboardAwareScrollView contentContainerClassName="grow justify-center gap-16 px-[16px]">
        <View className="justify-between gap-3">
          <View>
            <Typography weight={600} color="main" className="text-[24px]">
              Profile
            </Typography>
          </View>

          <View className="items-center justify-center">
            <Image
              contentFit="contain"
              className="size-[100px]"
              source={require('assets/basic-profile.png')}
            />
          </View>

          <View className="items-center">
            <Typography weight={600} color="main" className="text-[24px]">
              Andrew
            </Typography>
          </View>

          <View className="mx-[16px] h-[114px] rounded-3xl bg-[#ECF4FC] p-[20px]">
            <View className="flex-row gap-x-4">
              <View>
                <Image
                  contentFit="contain"
                  className="size-[63px]"
                  source={require('assets/profile-completion.svg')}
                />
              </View>

              <View className="gap-[2px]">
                <Typography weight={600} color="main" className="text-[18px]">
                  Wall completion
                </Typography>

                <Typography weight={500} color="main" className="text-[14px]">
                  Details remaining
                </Typography>

                <Typography weight={400} className="text-[13px] text-[#707070]">
                  updated ago
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <View className="mx-[16px]">
          {menuItems.map((item) => (
            <ProfileMenuItem
              key={item.id}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </View>
      </KeyboardAwareScrollView>
    </GradientView>
  );
}
