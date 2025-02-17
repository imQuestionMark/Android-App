import { Heart } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

const isLoading = true;

export default function ButtonExample() {
  return (
    <View className="flex-1  justify-center gap-4 bg-white p-4">
      {/* Basic usage */}
      <Button>
        <ButtonText>Click me</ButtonText>
      </Button>

      {/* With icon */}
      <Button variant="outline" className="gap-1 border-red-700">
        <ButtonIcon>
          <Heart color="red" fill="red" size={14} />
        </ButtonIcon>
        <ButtonText className="text-red-400">Like</ButtonText>
      </Button>

      {/* Loading state */}
      <Button isDisabled={isLoading} size="md">
        {isLoading && <ActivityIndicator />}
        <ButtonText>Processing...</ButtonText>
      </Button>

      {/* Icon only */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-black"
      >
        <ButtonIcon>
          <Heart size={14} fill={'black'} />
        </ButtonIcon>
      </Button>

      {/* Disabled state */}
      <Button isDisabled size="lg">
        {isLoading && <ActivityIndicator color={'white'} size="large" />}
        <ButtonText>Disabled</ButtonText>
      </Button>
    </View>
  );
}
