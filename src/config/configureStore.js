// @flow
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../state/rootReducer';

function configureStore() {
  let middleware = [];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middleware),
  );
}

export default configureStore;
