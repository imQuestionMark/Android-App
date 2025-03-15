import { View, Text } from 'react-native';
import React from 'react';
import { Slot } from 'expo-router';

const BasicLayout = () => {
  return (
    <View>
      <Text>BasicLayout</Text>
      <Slot />
    </View>
  );
};

export default BasicLayout;
