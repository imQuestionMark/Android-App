import { useRouter } from 'expo-router';

import GradientView from '@/components/onboarding/gradient-view';
import { Typography } from '@/components/ui';
import { Button, ButtonText } from '@/components/ui/button';
import { signOut } from '@/lib/store/auth-store';
import { removeFirstName, removeUserID } from '@/lib/store/user-store';

const Home = () => {
  const router = useRouter();

  const handleSignout = () => {
    router.replace({ pathname: '/' });
    signOut();
    removeFirstName();
    removeUserID();
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
