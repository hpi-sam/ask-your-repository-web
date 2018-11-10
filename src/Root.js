// @flow
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
import App from './App';

const store: any = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
