import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconview}>
        <Ionicons name="cloud-offline-outline" size={120} />
      </View>
      <Text style={styles.emptyText}>Empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5F0F2',
  },
  iconview: {
    marginTop: 200,
  },
  emptyText: {
    marginTop: 20,
    letterSpacing: 5,
    color: '#768282',
    fontSize: 25,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
  },
});

export default EmptyComponent;
