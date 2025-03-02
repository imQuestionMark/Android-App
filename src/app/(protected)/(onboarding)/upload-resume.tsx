import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';

import { Typography } from '@/components/ui';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CirclePause, CircleX } from 'lucide-react-native';

type UploadProgressProps = {
  progress: number;
  timeRemaining: number;
  onPause: () => void;
  onCancel: () => void;
};

type UploadZoneProps = {
  onUpload: () => void;
};

const UploadProgress = ({
  progress,
  timeRemaining,
  onPause,
  onCancel,
}: UploadProgressProps) => (
  <View className="border border-[#E7E7E7] rounded-xl p-4 gap-2">
    <View className="flex-row items-center">
      <View className="grow">
        <Typography
          weight={600}
          color="main"
          className="text-[14px] leading-[26px]"
        >
          Uploading...
        </Typography>

        <View className="flex-row gap-2">
          <Typography color="main" className="text-[14px] leading-[26px]">
            {progress}%
          </Typography>
          <Typography color="main" className="text-[14px] leading-[26px]">
            •
          </Typography>
          <Typography color="main" className="text-[14px] leading-[26px]">
            {timeRemaining} seconds remaining
          </Typography>
        </View>
      </View>

      <View className="flex-row gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-[24px]"
          onPress={onPause}
        >
          <ButtonIcon>
            <CirclePause size={20} color={'gray'} />
          </ButtonIcon>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-[24px]"
          onPress={onCancel}
        >
          <ButtonIcon>
            <CircleX size={20} color={'red'} />
          </ButtonIcon>
        </Button>
      </View>
    </View>

    <View className="h-3 rounded-xl bg-body/10">
      <View
        className="h-3 rounded-xl bg-primary absolute"
        style={{
          width: `${progress}%`,
        }}
      />
    </View>
  </View>
);

const UploadZone = ({ onUpload }: UploadZoneProps) => (
  <View className="items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#1849D6] p-6">
    <Image className="size-[42px]" source={require('assets/upload.png')} />

    <View className="gap-2">
      <Typography className="items-center justify-center text-center text-[14px]">
        Drag your file(s) to start uploading
      </Typography>

      <View className="flex-row items-center justify-center gap-2">
        <View className="h-[1px] w-20 bg-[#E7E7E7]" />
        <Typography className="mx-1 text-xs text-[#6D6D6D]">OR</Typography>
        <View className="h-[1px] w-20 bg-[#E7E7E7]" />
      </View>

      <View className="items-center">
        <Button variant="outline" className="px-3 py-[6px]" onPress={onUpload}>
          <ButtonText weight={600} color="primary" className="text-[12px]">
            Browse files
          </ButtonText>
        </Button>
      </View>
    </View>
  </View>
);

export default function UploadResume() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        // copyToCacheDirectory: true,
        multiple: false,
      });

      console.log('🚀🚀🚀 ~ handleUpload ~ result:', result);

      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        if (file.size && file.size > 5 * 1024 * 1024) {
          // Show error for files larger than 5MB
          console.error('File size is larger than 5MB');
          return;
        }

        setIsUploading(true);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsUploading(false);
              return 100;
            }
            return prev + 5;
          });
          setTimeRemaining((prev) => Math.max(0, prev - 1));
        }, 250);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  }, []);

  const handlePause = useCallback(() => {
    // Implement pause functionality
  }, []);

  const handleCancel = useCallback(() => {
    setUploadProgress(0);
    setTimeRemaining(30);
    setIsUploading(false);
  }, []);

  return (
    <SafeAreaView className="grow gap-6 bg-white p-3">
      <View className="items-center px-[35px]">
        <Image
          className="h-[301px] w-[360px]"
          source={require('assets/resume.png')}
          contentFit="contain"
          transition={200}
        />
      </View>

      <View className="justify-center gap-[2px]">
        <Typography
          weight={700}
          className="text-[18px] leading-[26px] text-main"
        >
          Upload Existing Resume
        </Typography>
        <Typography className="text-[14px] leading-[16px] text-[#929497]">
          Add your resume here, and you can upload up to 5 MB max
        </Typography>
      </View>

      <UploadZone onUpload={handleUpload} />

      {isUploading && (
        <UploadProgress
          progress={uploadProgress}
          timeRemaining={timeRemaining}
          onPause={handlePause}
          onCancel={handleCancel}
        />
      )}
    </SafeAreaView>
  );
}
