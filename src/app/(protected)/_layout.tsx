import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/lib/auth';

export default function AppLayout() {
  const authStatus = useAuth.use.status();
  const isAuthenticated = authStatus === 'authenticated';

  if (!isAuthenticated) {
    return <Redirect href={{ pathname: '/login' }} />;
  }

  return <Stack />;
}
