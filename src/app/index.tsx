import { Redirect } from 'expo-router';

const Index = () => {
  return <Redirect href={{ pathname: '/personal-details' }} />;
};

export default Index;
