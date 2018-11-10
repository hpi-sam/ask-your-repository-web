// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './state/rootReducer';
import App from './App';

let middleware = [];

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  middleware = [...middleware, logger];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
