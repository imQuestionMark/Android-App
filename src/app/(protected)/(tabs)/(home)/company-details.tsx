import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CompanyDetails = () => {
  return (
    <SafeAreaView>
      <Link href={{ pathname: '/applied-success' }}>
        <Text>CompanyDetails</Text>
      </Link>
    </SafeAreaView>
  );
};

export default CompanyDetails;
