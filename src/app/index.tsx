import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/wall/upload-details' }} />
    </>
  );
};

export default Index;
