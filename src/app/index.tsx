import { Redirect } from 'expo-router';

const Index = () => {
  return <Redirect href={{ pathname: '/test' }} />;
};

export default Index;
