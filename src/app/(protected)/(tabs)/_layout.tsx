import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Typography } from '@/components/ui';
import Home from '@/components/ui/icons/tab/home';
import Reach from '@/components/ui/icons/tab/reach';
import Wall from '@/components/ui/icons/tab/wall';

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
        tabBarButton(props) {
          return (
            <Pressable className="flex-1" {...props} android_ripple={null} />
          );
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
          title: '',
          tabBarIcon: () => {
            return (
              <View
                className="flex size-[90px] items-center justify-center rounded-full bg-white p-2"
                style={{
                  boxShadow: '0px -1px 4px 1px rgba(200,199,255,1);',
                }}
              >
                <View className="size-full items-center justify-center rounded-full  bg-primary ">
                  <Wall width={26} color={'white'} />
                  <Typography weight={500} className="text-sm text-white">
                    Wall
                  </Typography>
                </View>
              </View>
            );
          },
          tabBarItemStyle: {
            marginTop: -10,
          },
          tabBarLabelStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
            color: 'white',
          },
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
