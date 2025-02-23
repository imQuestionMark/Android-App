import { router } from 'expo-router';
import { Text } from 'react-native';

import GradientView from '@/components/onboarding/gradient-view';
import { Button, ButtonText } from '@/components/ui/button';
import { signOut } from '@/lib/auth';

const Home = () => {
  const handleSignout = () => {
    router.replace({ pathname: '/' });
    signOut();
  };

  return (
    <GradientView>
      <Text>Home</Text>
      <Button onPress={handleSignout}>
        <ButtonText>Sign out</ButtonText>
      </Button>
    </GradientView>
  );
};

export default Home;
