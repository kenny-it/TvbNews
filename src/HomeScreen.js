import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeTemplate from './components/HomeTemplate';

import ITEMS from './mock';

const Tab = createMaterialTopTabNavigator();

const HEADURI = 'http://api.news.tvb.com/news/v2.1.1/category?profile=app';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      headList: ITEMS,
    };
    this.getTabScreen = this.getTabScreen.bind(this);
  }

  componentDidMount() {
    this.getHeadListFromNet();
  }

  async getHeadListFromNet() {
    try {
      const res = await fetch(HEADURI);
      const data = await res.json();
      this.setState({headList: data.items});
    } catch (error) {
      console.error(error);
    }
  }

  getTabScreen(items) {
    return items.map(list => (
      <Tab.Screen name={list.title} key={list.id}>
        {() => <HomeTemplate id={list.id} navigation={this.props.navigation} />}
      </Tab.Screen>
    ));
  }

  render() {
    const {headList} = this.state;
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: {width: 80},
          tabBarScrollEnabled: true,
        }}>
        {this.getTabScreen(headList)}
      </Tab.Navigator>
    );
  }
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
