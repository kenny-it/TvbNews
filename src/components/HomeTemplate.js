import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

const APIURI =
  'http://api.news.tvb.com/news/v2.1.1/entry?profile=app&category=';

class HomeTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.getDataFromNet = this.getDataFromNet.bind(this);
  }

  componentDidMount() {
    if (this.state.data.length > 0) return;
    this.getDataFromNet(this.props.id);
  }

  async getDataFromNet(id) {
    try {
      const res = await fetch(APIURI + id + '&stamp=0');
      const data = await res.json();
      this.setState({
        data: data.items,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const {data} = this.state;
    const {navigation} = this.props;
    return data && data.length > 0 ? (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListScreen item={item} navigation={navigation} />
        )}
      />
    ) : null;
  }
}

const ListScreen = ({navigation, item}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDD"
      onPress={() => navigation.navigate('NewsDetail', item)}>
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: item.image[item.image.length - 1].thumbnail.url,
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

export default HomeTemplate;
