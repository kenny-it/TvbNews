import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SectionTemplate from './components/SectionTemplate';

import ITEMS from './mock';

const Tab = createMaterialTopTabNavigator();

const HEADURI = 'http://api.news.tvb.com/news/v2.1.1/category?profile=app';

const HomeScreen = ({navigation}) => {
  const [headList, setHeadList] = useState(ITEMS);

  useEffect(() => {
    getHeadListFromNet();
  }, []);

  const getHeadListFromNet = async () => {
    try {
      const res = await fetch(HEADURI);
      const data = await res.json();
      setHeadList(data.items);
    } catch (error) {
      ToastAndroid.show(
        "Couldn't get category from network!",
        ToastAndroid.SHORT,
      );
    }
  };

  const getTabScreen = items => {
    return items.map(list => (
      <Tab.Screen name={list.title} key={list.id}>
        {() => (
          <SectionTemplate
            id={list.id}
            navigation={navigation}
            navigateTitle={list.title}
          />
        )}
      </Tab.Screen>
    ));
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {width: 80},
        tabBarScrollEnabled: true,
      }}>
      {getTabScreen(headList)}
    </Tab.Navigator>
  );
};

export default HomeScreen;
