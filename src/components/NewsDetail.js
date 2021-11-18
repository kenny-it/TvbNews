import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Image,
  Dimensions,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const width = Dimensions.get('window').width;

const NewsDetail = ({navigation, route}) => {
  const {params} = route;
  const [item, setItem] = useState(params.item);
  const [realVideoUri, setRealVideoUri] = useState(null);
  const [imgUri, setImgUri] = useState(
    params.item?.image[params.item?.image.length - 1].big.url,
  );
  const [fakeVideoUri, setFakeVideoUri] = useState(
    params.item?.video?.[2]?.video_web?.url,
  );

  useEffect(() => {
    navigation.setOptions({
      title: params.title ? params.title : 'No title',
    });
    getVideoURi();
  }, []);

  const getVideoURi = async () => {
    try {
      if (fakeVideoUri) {
        const res = await fetch(fakeVideoUri);
        setRealVideoUri(res.url);
      }
    } catch (error) {
      ToastAndroid.show("Couldn't get Data from Newwork!", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.VideoWrapper}>
        {realVideoUri ? (
          <VideoPlayer
            source={{
              uri: realVideoUri,
            }}
            style={styles.backgroundVideo}
            controls={false}
            automaticallyWaitsToMinimizeStalling={true}
            resizeMode={'contain'}
            fullscreen={true}
            paused={true}
            poster={imgUri}
            posterResizeMode="cover"
            navigator={navigation}
            onBack={() => navigation.goBack()}
          />
        ) : (
          <Image
            style={{width, height: 230}}
            source={{uri: imgUri}}
            // resizeMode="contain"
          />
        )}
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.detailWrapper}>
          <View style={styles.titleBox}>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
              {item.title}
            </Text>
            <Text style={{fontSize: 13, letterSpacing: 1.5}}>
              {item.publish_datetime}
            </Text>
          </View>
          <View style={styles.articleBox}>
            <Text style={{fontSize: 17, letterSpacing: 1.5}}>
              {item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  VideoWrapper: {
    height: 240,
    justifyContent: 'flex-start',
  },
  backgroundVideo: {},
  detailWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleBox: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  articleBox: {
    marginTop: 30,
    paddingBottom: 20,
  },
});

export default NewsDetail;
