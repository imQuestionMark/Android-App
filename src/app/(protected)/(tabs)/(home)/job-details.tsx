import { Link } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobDetails = () => {
  return (
    <SafeAreaView>
      <Link href={{ pathname: '/company-details' }}>
        <Text>JobDetails</Text>
      </Link>
    </SafeAreaView>
  );
};

export default JobDetails;
