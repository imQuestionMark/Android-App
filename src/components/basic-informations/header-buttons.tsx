import React from 'react';

import { Button, ButtonText } from '../ui';

type headerProps = {
  label: string;
  onPress: () => void;
};

export const BasicHeaderButton = ({ onPress, label }: headerProps) => {
  return (
    <Button variant="link" className="px-4">
      <ButtonText onPress={onPress}>{label}</ButtonText>
    </Button>
  );
};
