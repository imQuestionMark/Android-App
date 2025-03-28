import Ionicons from '@expo/vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '@/components/ui';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { useDocumentPicker } from '@/lib/hooks/document-upload';
import { devLog } from '@/lib/utils';

type UploadProgressProps = {
  onCancel: () => void;
  onPause: () => void;
  progress: number;
  timeRemaining: number;
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
  <View className="gap-2 rounded-xl border border-[#E7E7E7] p-4">
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
        <Button variant="icon" className="size-7 border-0" onPress={onPause}>
          <ButtonIcon>
            <Ionicons name="pause-circle-outline" size={20} color="gray" />
          </ButtonIcon>
        </Button>

        <Button variant="icon" className="size-7 border-0" onPress={onCancel}>
          <ButtonIcon>
            <Ionicons name="stop-circle-outline" size={20} color="red" />
          </ButtonIcon>
        </Button>
      </View>
    </View>

    <View className="h-3 rounded-xl bg-body/10">
      <View
        className="absolute h-3 rounded-xl bg-primary"
        style={{
          width: `${progress}%`,
        }}
      />
    </View>
  </View>
);

const UploadZone = ({ onUpload }: UploadZoneProps) => (
  <View className="items-center justify-center gap-3 rounded-lg border-2 border-dashed border-secondary p-6">
    <Image className="size-[42px]" source={require('assets/upload.png')} />

    <View className="gap-2">
      <Typography className="items-center justify-center text-center text-[14px]">
        Drag your file(s) to start uploading
      </Typography>

      <View className="flex-row items-center justify-center gap-2">
        <View className="h-px w-20 bg-[#E7E7E7]" />
        <Typography className="mx-1 text-xs text-[#6D6D6D]">OR</Typography>
        <View className="h-px w-20 bg-[#E7E7E7]" />
      </View>

      <View className="items-center">
        <Button
          variant="outline"
          size="sm"
          className="rounded-[8px] border-secondary px-[12px]"
          onPress={onUpload}
        >
          <ButtonText weight={600} className="text-[12px] text-secondary">
            Browse files
          </ButtonText>
        </Button>
      </View>
    </View>
  </View>
);

export default function UploadResume() {
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const uploadInterval = useRef<NodeJS.Timeout | null>(null);
  const { pickDocument, selectedFiles } = useDocumentPicker();
  const [size, setSize] = useState({ height: 0, width: 0 });
  const [filePath, setFilePath] = useState<null | string>(null);

  const clearUploadInterval = useCallback(() => {
    if (uploadInterval.current) {
      clearInterval(uploadInterval.current);
      uploadInterval.current = null;
    }
  }, []);

  useEffect(() => {
    console.log({ size });
  }, [size]);

  const resetTimer = useCallback(() => {
    clearUploadInterval();
    setUploadProgress(0);
    setTimeRemaining(20);
    setIsUploading(false);
  }, [clearUploadInterval]);

  const handleUpload = useCallback(async () => {
    try {
      const result = await pickDocument({
        allowedTypes: 'PDF',
        multiple: true,
        maxSizeInMB: 30,
      });

      devLog('🚀🚀🚀:', result);

      if (!result) return;
      const path = await convertContentUriToFilePath(result.assets[0].uri);

      console.log('🚀🚀🚀 ~ handleUpload ~ path:', path);

      setFilePath(path);

      // resetTimer();

      // setIsUploading(true);

      // uploadInterval.current = setInterval(() => {
      //   setUploadProgress((prev) => {
      //     if (prev >= 100) {
      //       clearUploadInterval();
      //       resetTimer();
      //       return 100;
      //     }
      //     return prev + 5;
      //   });

      //   setTimeRemaining((prev) => Math.max(1, prev - 1));
      // }, 1000);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  }, [pickDocument]);

  const handlePause = useCallback(() => {
    clearUploadInterval();
  }, [clearUploadInterval]);

  const handleCancel = useCallback(() => {
    resetTimer();
  }, [resetTimer]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const convertContentUriToFilePath = async (uri: string) => {
    try {
      const fileUri = FileSystem.cacheDirectory + 'temp.pdf';
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
      return fileUri;
    } catch (error) {
      console.error('Error converting URI:', error);
      return uri;
    }
  };

  return (
    <SafeAreaView className="grow bg-white p-3">
      <ScrollView contentContainerClassName="grow gap-6 bg-purple-200">
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

        {selectedFiles?.assets &&
          selectedFiles.assets.length > 0 &&
          filePath && (
            <View style={styles.container}>
              <Pdf
                source={{
                  uri: filePath,
                  cache: true,
                }}
                trustAllCerts={false}
                onLoadComplete={(numberOfPages, _, size) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                  console.log({ size });
                  setSize(size);
                }}
                onPageChanged={(page) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link pressed: ${uri}`);
                }}
                fitPolicy={0}
                style={{
                  flex: 1,
                  width: screenWidth,
                  height: size.height || screenHeight,
                }}
              />
            </View>
          )}

        {isUploading && (
          <UploadProgress
            progress={uploadProgress}
            timeRemaining={timeRemaining}
            onPause={handlePause}
            onCancel={handleCancel}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'red',
  },
  pdf: {
    flex: 1,
    backgroundColor: 'green',
  },
});
