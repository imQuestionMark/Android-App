import { CalendarDays } from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonIcon, ButtonText } from '@/components/ui';

import { Typography } from '../components/ui/text';
import Step from '@/components/ui/step';

const Test = () => {
  return (
    <SafeAreaView className="m-5 grow">
      <ScrollView>
        <View>
          <Typography type="heading" className="text-error">
            Heading
          </Typography>
          <Typography type="heading" color="green">
            Heading Green
          </Typography>
          <Typography type="heading" color="green" className="text-purple-200">
            Heading Overridden
          </Typography>
          <Typography type="subtext">Subtext</Typography>
          <Typography type="subtext" color="primary">
            Subtext Primary
          </Typography>
          <Typography type="paragraph">Paragraph</Typography>
          <Typography type="paragraph" color="error">
            Paragraph Error
          </Typography>
          <Typography type="label">Label</Typography>
          <Typography type="label" color="main">
            Label Main
          </Typography>
          <Typography type="placeholder">Placeholder</Typography>
          <Typography type="placeholder" color="primary">
            Placeholder Primary
          </Typography>
        </View>

        <View className="flex-row gap-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Step key={idx} active={idx % 2 === 0} />
          ))}
        </View>

        <View>
          <Typography weight={100} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={200} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={300} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={400} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={500} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={600} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={700} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={800} className="text-[36px]">
            The quick brown fox
          </Typography>
          <Typography weight={900} className="text-[36px]">
            The quick brown fox
          </Typography>
        </View>

        <View className="gap-4">
          <Button className="items-stretch">
            <View className="flex justify-center ">
              <CalendarDays className="w-8 text-white" />
            </View>
            <ButtonText weight={100} className="text-[36px] text-white">
              Hello world
            </ButtonText>
          </Button>

          <Button>
            <ButtonIcon>
              <CalendarDays className="w-8 text-white" />
            </ButtonIcon>
            <ButtonText weight={400} className="text-[26px] text-white">
              Hello world
            </ButtonText>
          </Button>

          <Button className="items-center">
            <View className="flex-row items-center gap-3">
              <CalendarDays className="w-8 text-white" />
              <ButtonText
                weight={100}
                className="text-[36px] text-white"
                style={{
                  includeFontPadding: false,
                }}
              >
                žHello world
              </ButtonText>
            </View>
          </Button>

          <Button>
            <ButtonIcon>
              <CalendarDays className="w-8 text-white" />
            </ButtonIcon>
            <ButtonText weight={400} className="text-[26px] text-white">
              Hello world
            </ButtonText>
          </Button>

          <Button>
            <ButtonText weight={900} className="text-[36px] text-white">
              The quick fox
            </ButtonText>
          </Button>

          <Button>
            <ButtonText weight={500} className="text-[26px] text-white">
              The quick fox
            </ButtonText>
          </Button>

          <Button>
            <ButtonText weight={600} className="text-[14px] text-white">
              The quick fox
            </ButtonText>
          </Button>

          <Button>
            <ButtonText weight={500} className="text-[20px] text-white">
              The quick fox
            </ButtonText>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
