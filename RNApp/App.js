/**
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import configureStore from './src/store/configureStore';
import Home from './src/screens/Home';
import Details from './src/screens/Details';

const store = configureStore();

const AppNavigator = createStackNavigator(
  {
    Home,
    Details,
  },
  { defaultNavigationOptions: { header: null } }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
