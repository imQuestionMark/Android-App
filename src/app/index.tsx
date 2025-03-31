import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/personal-details' }} />
    </>
  );
};

export default Index;
