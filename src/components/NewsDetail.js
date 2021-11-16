import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

class NewsDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.VideoWrapper}>
          <VideoPlayer
            source={{
              uri: 'http://token.tvb.com/stream/vod/news/rtmps/inews1/20211114/entries_6190ad11c652e933299e7349_c999d5b6b8bab8662faae7fafe463f04_cht_1280_720_1452000.mp4',
            }}
            style={styles.backgroundVideo}
            controls={true}
            automaticallyWaitsToMinimizeStalling={true}
            resizeMode={'contain'}
          />
        </View>
        <View>
          <Text>Video</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  VideoWrapper: {
    height: 300,
    backgroundColor: 'pink',
  },
  backgroundVideo: {
    flex: 1,
  },
});

export default NewsDetail;
