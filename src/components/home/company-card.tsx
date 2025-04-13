import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Button, ButtonText, Typography } from '../ui';
import { DottedLine } from '../ui/dotted-line';

export const CompanyCard = () => {
  const router = useRouter();

  const handleViewCompany = () => {
    router.push({ pathname: '/company-details' });
  };

  return (
    <View className="mt-4 flex-row gap-6 rounded-[12px] border border-[#EFEFF1] p-[16px]">
      <Image
        source={require('assets/basic-profile.png')}
        className="size-[64px]"
      />

      <View className="shrink">
        <Typography weight={600} className="text-[18px]">
          Karan
        </Typography>
        <Typography className="text-[14px] text-[#596574]">
          Human Resource Management
        </Typography>

        <DottedLine className="my-4" />

        <View className="mt-2 flex-row flex-wrap gap-4">
          <Button className=" px-[12px]" onPress={handleViewCompany}>
            <ButtonText className="text-[13px]">Company Details</ButtonText>
          </Button>

          <Button variant="outline" className=" px-[12px]">
            <Ionicons name="logo-whatsapp" size={18} color={'#0400D1'} />
            <ButtonText className="text-[13px]">Reach</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};
