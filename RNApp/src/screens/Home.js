/* @flow weak */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Header, Card } from 'react-native-elements';

const Home = ({
  peoples,
  getPeoples,
  loading,
  done,
  getPeople,
  navigation,
}) => {
  useEffect(() => {
    getPeoples();
  }, [getPeoples]);

  const _onEndReached = () => {
    if (!loading && !done) {
      getPeoples();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        getPeople(item.id);
        navigation.navigate('Details');
      }}
    >
      <Card title={item.name} />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Star Wars', style: styles.headerTitle }}
        statusBarProps={{ translucent: true, backgroundColor: '#2089DC' }}
      />

      <FlatList
        data={peoples}
        keyExtractor={item => `${item.id}`}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{}}
        style={{}}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    peoples: state.peoplesReducer.peoples,
    loading: state.peoplesReducer.loading,
    done: state.peoplesReducer.done,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPeoples: () => dispatch({ type: 'GET_PEOPLES' }),
    getPeople: id => dispatch({ type: 'GET_PEOPLE', id }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
  },
});
