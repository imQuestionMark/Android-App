import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const Index = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Link className="m-4 border px-8 py-4" href="/unasdf" replace>
          unknown
        </Link>
        <Link className="m-4 border px-8 py-4" href={{ pathname: '/_sitemap' }}>
          <Text>_sitemap</Text>
        </Link>
        <Link className="m-4 border px-8 py-4" href={{ pathname: '/login' }}>
          <Text>Login</Text>
        </Link>
        <Link
          className="m-4 border px-8 py-4"
          href={{ pathname: '/personal-details' }}
        >
          <Text>personal</Text>
        </Link>
        <Link
          className="m-4 border px-8 py-4"
          href={{ pathname: '/professional' }}
        >
          <Text>professional</Text>
        </Link>
        <Link className="m-4 border px-8 py-4" href={{ pathname: '/signup' }}>
          <Text>signup</Text>
        </Link>
        <Link
          className="m-4 border px-8 py-4"
          href={{ pathname: '/verification' }}
        >
          <Text>verification</Text>
        </Link>
      </View>
    </>
  );
};

export default Index;
