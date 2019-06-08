/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Details = ({}) => (
  <View style={styles.container}>
    <Text>I'm Details</Text>
  </View>
);

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
