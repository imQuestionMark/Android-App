import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';

const details = {
  logo: require('assets/figma.png'),
  company: 'Figma',
  location: 'New York, United States',
};

const CompanyDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-6">
          <DetailsCard details={details} />
          <Location />
          <CompanyDescription />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetails;

const DetailsCard = ({ details }) => {
  return (
    <LinearGradient
      colors={['#DFE8FF', '#FFFFFF']}
      style={{
        borderRadius: 12,
      }}
    >
      <View className=" rounded-2xl border border-primary p-6">
        <View className="flex-row items-center gap-6">
          <Image
            source={details.logo}
            contentFit="contain"
            className="size-[55px] overflow-hidden rounded-[12px] border border-black"
          />

          <Typography className="text-[32px] text-main" weight={500}>
            {details.company}
          </Typography>
        </View>

        <View className="my-4">
          <View className="flex-row items-center gap-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {details.location}
            </Typography>
          </View>
        </View>

        <View className="mt-2 flex-row flex-wrap gap-4">
          <Button className="grow" variant="outline">
            <ButtonText className="text-[13px]">Linkedin Profile</ButtonText>
          </Button>

          <Button variant="solid" className="grow">
            <ButtonText className="text-[13px]">Visit Website</ButtonText>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

const Location = () => {
  return (
    <View className="mt-4 flex-row gap-6 rounded-[12px] border border-[#EFEFF1] p-[16px]">
      <View className="gap-2">
        <Typography weight={500} className="text-[20px] text-main">
          Located At
        </Typography>
        <Typography className="text-[14px]">
          21, Sabari Street, Nesapakkam,. K.K. Nagar West, Chennai - 600 078
        </Typography>
      </View>
    </View>
  );
};

const CompanyDescription = () => {
  return (
    <View className="mt-4 flex-row gap-6 rounded-[12px] border border-[#EFEFF1] p-[16px]">
      <View className="gap-2">
        <Typography weight={500} className="text-[20px] text-main">
          Company Profile
        </Typography>
        <Typography className="text-[14px]">
          For the uninitiated, a company profile is a comprehensive document
          that provides detailed information about a business entity. It serves
          as a snapshot or overview of the company's history, mission, values,
          products, and other relevant information. Therefore, Microsoft's
          profile acted more than a marketing tool. It reflected its identity, a
          compass for navigating the industry, and a bridge between the brand
          and its audience.
        </Typography>
      </View>
    </View>
  );
};
