import { Redirect } from 'expo-router';

const Index = () => {
  return (
    <>
      <Redirect href={{ pathname: '/after-onboarding/professional' }} />
    </>
  );
};

export default Index;
