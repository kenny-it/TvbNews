import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';

import EmptyComponent from './EmptyComponent';

const APIURI =
  'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=';

const SectionTemplate = ({id, navigation, navigateTitle}) => {
  const [data, setData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    refreshingFunc();
  }, [refreshFlag]);

  const refreshingFunc = async () => {
    try {
      const res = await fetch(APIURI + id + '&stamp=0');
      const data = await res.json();
      setData(data.items);
    } catch (error) {
      ToastAndroid.show("Couldn't get data from network!", ToastAndroid.SHORT);
    }
    setRefreshFlag(false);
  };

  return data && data.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      refreshing={refreshFlag}
      onRefresh={() => {
        setRefreshFlag(true);
      }}
      renderItem={({item}) => (
        <ListScreen item={item} navigation={navigation} title={navigateTitle} />
      )}
    />
  ) : (
    <EmptyComponent />
  );
};

const ListScreen = ({navigation, item, title}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDD"
      delayLongPress={200}
      onLongPress={() => navigation.navigate('NewsDetail', {item, title})}>
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: item.image[item.image.length - 1].big.url,
            }}
          />
        </View>
        <View style={styles.wordWrapper}>
          <View style={styles.textUpper}>
            <Text style={{fontSize: 15}}>{item.title}</Text>
          </View>
          <View>
            <Text style={{fontSize: 13}}>{item.publish_datetime}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 280,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  imgWrapper: {
    flex: 2,
  },
  image: {
    flex: 1,
  },
  wordWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  textUpper: {
    marginBottom: 10,
  },
});

export default SectionTemplate;
