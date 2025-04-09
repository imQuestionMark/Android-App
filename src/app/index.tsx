import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/home' }} />
    </>
  );
};

export default Index;
