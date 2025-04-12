import React from 'react';

import { Button, ButtonText } from '../ui';

type headerProps = {
  label: string;
  onPress: () => void;
};

export const BasicHeaderButton = ({ onPress, label }: headerProps) => {
  return (
    <Button
      variant="link"
      className="px-4"
      hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
    >
      <ButtonText onPress={onPress}>{label}</ButtonText>
    </Button>
  );
};
