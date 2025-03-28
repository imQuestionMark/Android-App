import { Redirect, Stack } from 'expo-router';

const Index = () => {
  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/professional-details' }} />
    </>
  );
};

export default Index;
