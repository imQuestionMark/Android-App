import { router } from 'expo-router';

import GradientView from '@/components/onboarding/gradient-view';
import { Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

const Home = () => {
  const handleSignout = () => {
    router.replace({ pathname: '/' });
    signOut();
  };

  return (
    <GradientView>
      <Typography>Home</Typography>
      <Button onPress={handleSignout}>
        <ButtonText>Sign out</ButtonText>
      </Button>
    </GradientView>
  );
};

export default Home;
