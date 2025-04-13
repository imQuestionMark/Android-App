import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button, ButtonText, Typography } from '../ui';

export const JobDescription = () => {
  const router = useRouter();

  const handleApplyJob = async () => {
    console.log('Clicked on Apply Job');
    router.push({ pathname: '/applied-success' });
  };

  return (
    <View className="mt-4">
      <ProfileDescription />
      <QualificationDescription />

      <View className="mt-4">
        <DescriptionBadges />

        <View className="mt-2 flex-row justify-between gap-4">
          <Button variant="outline" className="grow px-[12px]">
            <ButtonText className="text-[13px]">Check</ButtonText>
          </Button>

          <Button className="grow px-[12px]" onPress={handleApplyJob}>
            <ButtonText className="text-[13px]">Apply Job</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

const QualificationDescription = () => {
  return (
    <View className="mt-4">
      <Typography weight={500} className="text-[20px]" color="main">
        Qualification
      </Typography>

      <View className="mx-4 mt-4 gap-3">
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </BulletinText>
      </View>
    </View>
  );
};

const ProfileDescription = () => {
  return (
    <View>
      <Typography weight={500} className="text-[20px]" color="main">
        Job Profile
      </Typography>

      <View className="mx-4 mt-4 gap-3">
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
        <BulletinText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </BulletinText>
      </View>
    </View>
  );
};

const DescriptionBadges = () => {
  return (
    <View>
      <Typography weight={500} className="text-[20px]" color="main">
        Skills
      </Typography>

      <View className="flex-row flex-wrap gap-5 p-[16px]">
        {[
          'Graphic Designing',
          'Adobe XD',
          'Web-design',
          'Adobe Photoshop',
          'Figma',
          'Illustrator',
        ].map((item) => (
          <SkillBadge key={item} label={item} />
        ))}
      </View>
    </View>
  );
};

const BulletinText = ({ children }: { children: React.ReactNode }) => {
  const bullet = '\u2022';

  return (
    <View className="flex-row gap-2">
      <Typography>{bullet}</Typography>
      <Typography>{children}</Typography>
    </View>
  );
};

const SkillBadge = ({ label }: { label: string }) => {
  return (
    <Button
      variant="outline"
      className="h-auto w-fit rounded-full border-primary bg-[#ECF4FC] px-3 py-2"
    >
      <ButtonText className="text-[14px] text-primary">{label}</ButtonText>
    </Button>
  );
};
