import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/wall' }} />
    </>
  );
};

export default Index;
