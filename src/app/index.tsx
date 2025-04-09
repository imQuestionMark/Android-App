import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/(protected)/(tabs)/(home)' }} />
    </>
  );
};

export default Index;
