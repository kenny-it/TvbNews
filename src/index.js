import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CatchScreen from './CatchScreen';
import FeatureScreen from './FeatureScreen';
import LiveScreen from './LiveScreen';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case '主页':
              iconName = 'home-outline';
              break;
            case '新闻直播':
              iconName = 'cloud-outline';
              break;
            case '专题节目':
              iconName = 'tv-outline';
              break;
            case '新闻追踪':
              iconName = 'newspaper-outline';
              break;
            default:
              iconName = 'sad-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="主页" component={HomeScreen} />
      <Tab.Screen name="新闻直播" component={LiveScreen} />
      <Tab.Screen name="专题节目" component={FeatureScreen} />
      <Tab.Screen name="新闻追踪" component={CatchScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
