import { Heart } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';

const isLoading = true;

export default function ButtonExample() {
  return (
    <View className="gap-4 bg-white p-4">
      {/* Basic usage */}
      <Button>
        <ButtonText>Click me</ButtonText>
      </Button>

      {/* With icon */}
      <Button variant="outline">
        <ButtonIcon>
          <Heart color="red" fill="red" />
        </ButtonIcon>
        <ButtonText>Like</ButtonText>
      </Button>

      {/* Loading state */}
      <Button isLoading={isLoading}>
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
          <Heart size={20} />
        </ButtonIcon>
      </Button>

      {/* Disabled state */}
      <Button isDisabled>
        <ButtonText>Disabled</ButtonText>
      </Button>

      {/* Custom classes */}
      <Button className="bg-purple-500">
        <ButtonText className="text-white">Custom Style</ButtonText>
      </Button>
    </View>
  );
}
