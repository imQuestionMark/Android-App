import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Link replace href="/unasdf" className="m-4 border px-8 py-4">
          unknown
        </Link>
        <Link className="m-4 border px-8 py-4" href={{ pathname: '/_sitemap' }}>
          <Text>_sitemap</Text>
        </Link>
        <Link href={{ pathname: '/login' }} className="m-4 border px-8 py-4">
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

        <Link
          className="m-4 border px-8 py-4"
          href={{ pathname: '/professional2' }}
        >
          <Text>professional 2</Text>
        </Link>

        <Link href={{ pathname: '/signup' }} className="m-4 border px-8 py-4">
          <Text>signup</Text>
        </Link>
        <Link
          className="m-4 border px-8 py-4"
          href={{ pathname: '/verification' }}
        >
          <Text>verification</Text>
        </Link>
        <StatusBar animated style="dark" />
      </View>
    </>
  );
};

export default Index;
