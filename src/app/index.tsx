import { Redirect } from 'expo-router';

const Index = () => {
  return <Redirect href={{ pathname: '/signup' }} />;
};

export default Index;
