import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Home from '@/components/ui/icons/tab/home';
import Reach from '@/components/ui/icons/tab/reach';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0400D1',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          position: 'absolute', // android hack
          boxShadow: '0px -1px 4px 0px rgba(200,199,255,1);',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home
              width={16}
              height={16}
              color={color}
              fill={focused ? color : 'white'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reach"
        options={{
          title: 'Reach',
          tabBarIcon: ({ color, focused }) => (
            <Reach color={color} fill={focused ? color : 'white'} />
          ),
        }}
      />
      <Tabs.Screen
        name="wall"
        options={{
          title: 'Wall',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={16} name="address-book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={16} name="sticky-note" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={16} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
