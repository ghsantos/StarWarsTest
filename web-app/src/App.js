import React from 'react';
import { Provider } from 'react-redux';
import './App.css';

import configureStore from './store/configureStore';
import Home from './scenes/Home';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
