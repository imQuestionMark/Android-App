import { CalendarDays, CirclePlus } from 'lucide-react-native';
import React from 'react';
import { PixelRatio, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ButtonText, Typography } from '@/components/ui';
import Step from '@/components/ui/step';
import { useStepper } from '@/lib/hooks/use-stepper';

const TOTAL_STEPS = 8;

const Test = () => {
  const { goToNext, goToPrevious, isFirstStep, isLastStep, currentStep } =
    useStepper({
      totalSteps: TOTAL_STEPS,
    });

  return (
    <SafeAreaView className="m-5 grow bg-white">
      <ScrollView>
        <View id="text-variants">
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

        <View className="gap-3" id="stepper">
          <View className="flex-row justify-between">
            <Button
              variant="ghost"
              onPress={goToPrevious}
              disabled={isFirstStep}
              className="px-0"
            >
              <ButtonText>Back</ButtonText>
            </Button>

            <Button
              variant="ghost"
              onPress={goToNext}
              disabled={isLastStep}
              className="px-0"
            >
              <ButtonText>Next</ButtonText>
            </Button>
          </View>

          <View className="flex-row gap-1">
            {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
              <Step key={idx} active={currentStep >= idx} />
            ))}
          </View>
        </View>

        <View id="typography-variants">
          <Typography
            weight={100}
            className="text-4xl"
            allowFontScaling={false}
          >
            The quick brown fox {PixelRatio.get()}
          </Typography>
          <Typography weight={200} className="text-4xl">
            The quick brown fox {PixelRatio.getFontScale()}
          </Typography>
          <Typography weight={300} className="text-[36px]">
            The quick brown fox {PixelRatio.getPixelSizeForLayoutSize(10)}
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

        <View className="m-4 items-center gap-4" id="button-variants">
          {/* Default Variant variant="solid" size="lg" */}
          <Button>
            <CalendarDays className="text-white" size={18} />
            <ButtonText weight={100} className="">
              Solid LG
            </ButtonText>
          </Button>

          <Button size="2xl" className="h-[51px] gap-3">
            <CirclePlus className="text-white" size={22} />
            <ButtonText
              weight={500}
              className="text-[16px]"
              style={{
                lineHeight: 27.2,
              }}
            >
              Create New Resume
            </ButtonText>
            {/* <View className="absolute h-[2px] w-full bg-red-600" /> */}
          </Button>

          <Button variant="outline" size="lg">
            <CalendarDays className="text-primary" size={18} />
            <ButtonText weight={100} className="">
              Outline LG
            </ButtonText>
          </Button>

          <Button variant="ghost" size="lg" className="">
            <CalendarDays className="text-primary" size={18} />
            <ButtonText weight={100} className="">
              Ghost LG
            </ButtonText>
          </Button>

          <Button variant="icon" size="lg" className="p-0">
            <CalendarDays className="text-primary" size={18} />
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Test;
