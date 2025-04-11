import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';

import { Button, ButtonText, Typography } from '@/components/ui';

import { JobCard } from '.';

type Job = {
  company: string;
  experience: string;
  id: string;
  isSaved: boolean;
  location: string;
  logo: any;
  matchingSkills?: number;
  postedDays: number;
  tag: string;
  title: string;
};

type JobCardProps = {
  job: Job;
};

const jobs: Job[] = [
  {
    id: '1',
    title: 'UI / UX Designer',
    company: 'Figma',
    logo: require('assets/figma.png'),
    location: 'New York, United States',
    experience: '1-2 years Experience',
    postedDays: 20,
    matchingSkills: 5,
    isSaved: true,
    tag: 'Designing',
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Huawei',
    logo: require('assets/huawei.png'),
    location: 'Tokyo, Japan',
    experience: '1-2 years Experience',
    postedDays: 20,
    matchingSkills: 2,
    isSaved: true,
    tag: 'Development',
  },
  {
    id: '3',
    title: 'Business Analyst',
    company: 'Apple Inc.',
    logo: require('assets/apple.png'),
    location: 'Chicago, United States',
    experience: '0-6 months Experience',
    postedDays: 20,
    isSaved: false,
    tag: 'Marketing',
  },
];

const fakeJob: Job = {
  id: '1',
  title: 'UI / UX Designer',
  company: 'Figma',
  logo: require('assets/figma.png'),
  location: 'New York, United States',
  experience: '1-2 years Experience',
  postedDays: 20,
  matchingSkills: 5,
  isSaved: true,
  tag: 'Designing',
};

const badge = [
  {
    icon: 'bag-outline',
    label: '1-2 Years',
  },
  {
    icon: 'bag-outline',
    label: 'Remote',
  },
  {
    icon: 'bag-outline',
    label: 'Fulltime',
  },
];

const JobDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={[]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-10">
          <JobDetailsCard job={fakeJob} />
          <CompanyCard />
          <JobDescription />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const JobDetailsCard: React.FC<JobCardProps> = ({ job }) => {
  const { title, company, logo, location } = job;

  const router = useRouter();

  const handleApplyJob = async () => {
    console.log('Clicked on Apply Job');
    router.push({ pathname: '/applied-success' });
  };

  return (
    <LinearGradient
      colors={['#DFE8FF', '#FFFFFF']}
      style={{
        borderRadius: 12,
      }}
    >
      <View className=" rounded-2xl border border-primary p-6">
        <View className=" items-center gap-6">
          <Image
            source={logo}
            contentFit="contain"
            className="size-[55px] overflow-hidden rounded-[12px] border border-black"
          />
          <Typography className="text-[20px] text-black" weight={500}>
            {title}
          </Typography>
          <Typography className="text-[18px]" weight={500}>
            {company}
          </Typography>
        </View>

        <View className="m-4">
          <Svg height="2" width="100%">
            <Line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke="#838383"
              strokeWidth="2"
              strokeDasharray="6, 3"
            />
          </Svg>
        </View>

        <View className="mb-3 mt-2 items-center gap-4">
          <View className="flex-row items-center gap-4 px-4">
            <Ionicons name="location-outline" size={20} color="#596574" />
            <Typography className="text-[16px] text-[#596574]">
              {location}
            </Typography>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-center gap-[12px]">
          {badge.map((item, index) => (
            <Badge key={index} icon={item.icon} label={item.label} />
          ))}
        </View>

        <View className=" mt-4 flex-row items-center justify-center gap-4">
          <Ionicons name="logo-bitcoin" size={20} color={'#0400D1'} />
          <Typography className="text-[16px] text-primary">
            3LPA - 4LPA Salary
          </Typography>
        </View>

        <View className="mt-4 items-center justify-center">
          <Button className="px-20" variant="solid" onPress={handleApplyJob}>
            <ButtonText weight={500} className="text-[16px]">
              Apply Job
            </ButtonText>
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default JobDetails;

const Badge = ({ label, icon }: { icon: string; label: string }) => {
  return (
    <Button
      variant="outline"
      className="h-auto w-fit rounded-full border-[#596574] bg-white px-3 py-2"
    >
      <Ionicons name={icon} size={16} />
      <ButtonText className="text-[14px] text-[#596574]">{label}</ButtonText>
    </Button>
  );
};

const CompanyCard = () => {
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

const JobDescription = () => {
  const router = useRouter();

  const handleApplyJob = async () => {
    console.log('Clicked on Apply Job');
    router.push({ pathname: '/applied-success' });
  };

  return (
    <View className="mt-4">
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

      <View className="mt-4">
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

        <View className="mt-2 flex-row justify-between gap-4">
          <Button variant="outline" className="grow px-[12px]">
            <ButtonText className="text-[13px]">Check</ButtonText>
          </Button>

          <Button className="grow px-[12px]" onPress={handleApplyJob}>
            <ButtonText className="text-[13px]">Apply Job</ButtonText>
          </Button>
        </View>

        <DottedLine className="my-12" />

        <View className="flex-row items-center justify-between">
          <Typography weight={600} className="text-[20px] text-black">
            More Jobs
          </Typography>
          <Button variant="link" className="px-0">
            <ButtonText className="text-gray-500 text-[14px] underline">
              View all
            </ButtonText>
          </Button>
        </View>

        {jobs.map((item) => (
          <JobCard job={item} key={item.id} />
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

const DottedLine = ({ className = 'my-4' }: { className?: string }) => {
  return (
    <View className={className}>
      <Svg height="2" width="100%">
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#838383"
          strokeWidth="2"
          strokeDasharray="6, 3"
        />
      </Svg>
    </View>
  );
};
