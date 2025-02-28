import { View } from 'react-native';

import { Typography } from '../ui';

export const TermsandConditions = () => {
  return (
    <View className="flex-row items-center justify-center gap-1.5">
      <Typography weight={400} color="main" className="text-[12px]">
        You agree to the
      </Typography>
      <Typography weight={400} color="primary" className="text-[12px]">
        terms & conditions
      </Typography>
      <Typography weight={400} color="main" className="text-[12px]">
        &
      </Typography>
      <Typography weight={400} color="primary" className="text-[12px]">
        privacy policy
      </Typography>
    </View>
  );
};
