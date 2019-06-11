/* @flow weak */

import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Header, Text } from 'react-native-elements';

const Details = ({ people, loading, error, errorMessage }) => (
  <View style={styles.container}>
    <Header
      centerComponent={{ text: 'People', style: styles.headerTitle }}
      statusBarProps={{ translucent: true, backgroundColor: '#2089DC' }}
    />

    {loading && (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    )}

    {error && (
      <View>
        <Text h4>Error</Text>
        <Text>{errorMessage}</Text>
      </View>
    )}

    {!loading && !error && (
      <View style={styles.contentContainer}>
        <Text h3>{people.name}</Text>
        <Text>Birth year: {people.birth_year}</Text>
        <Text>Mass: {people.mass}</Text>
        <Text>Height: {people.height}</Text>
        <Text>Homeworld: {people.homeworld}</Text>
      </View>
    )}
  </View>
);

const mapStateToProps = state => {
  return {
    people: state.peopleReducer.people,
    loading: state.peopleReducer.loading,
    error: state.peopleReducer.error,
    errorMessage: state.peopleReducer.errorMessage,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});
