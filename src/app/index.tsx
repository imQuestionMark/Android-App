import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect
        href={{ pathname: '/(protected)/(basic-information)/experience' }}
      />
    </>
  );
};

export default Index;
