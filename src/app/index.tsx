import { useAuth } from '@/lib/store/auth-store';
import { Redirect, router, Stack } from 'expo-router';
import { useEffect } from 'react';

const Index = () => {
  // const updateOnboarding = useAuth((state) => state.updateOnboarding);

  // useEffect(() => {
  //   updateOnboarding(1);
  // }, []);

  return (
    <>
      <Stack />
      {/* <Redirect href={{ pathname: '/personal-details' }} /> */}
    </>
  );
};

export default Index;
