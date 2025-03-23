import { Redirect, Stack } from 'expo-router';

const Index = () => {
  // const updateOnboarding = useBoundStore((state) => state.updateOnboarding);

  // useEffect(() => {
  //   updateOnboarding(1);
  // }, []);

  return (
    <>
      <Stack />
      <Redirect href={{ pathname: '/education' }} />
    </>
  );
};

export default Index;
