import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { CirclePlus, Upload } from 'lucide-react-native';
import { View } from 'react-native';

import GradientView from '@/components/onboarding/gradient-view';
import { Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';

export default function Professional() {
  return (
    <GradientView className="mx-[16px] items-center justify-center">
      <View className=" w-full gap-6 rounded-3xl bg-white px-10 py-7">
        <View className="items-center justify-center gap-3">
          <Image
            className="size-[78px]"
            source={require('assets/profile.png')}
          />
          <Typography
            weight={700}
            className="text-center text-[20px] text-main"
          >
            Account Created 🎉
          </Typography>
          <Typography weight={400} className="text-[12px] text-[#929497]">
            Need to create your wall to complete the profile
          </Typography>
        </View>

        <View className="gap-[10px]">
          <Link href={{ pathname: '/after-onboarding/wall' }} asChild>
            <Button size="lg" className=" h-[51px] gap-[10px] ">
              <CirclePlus size={24} color="white" />
              <ButtonText weight={500} className="text-[16px] text-[#EBEBFF]">
                Create New Resume
              </ButtonText>
            </Button>
          </Link>

          <Link href={{ pathname: '/upload-resume' }} asChild>
            <Button variant="outline" className="h-[51px] gap-[10px]">
              <Upload size={24} color="#2800C9" />
              <ButtonText weight={500} className="text-[16px] text-primary">
                Upload Existing Resume
              </ButtonText>
            </Button>
          </Link>
        </View>
      </View>
    </GradientView>
  );
}
