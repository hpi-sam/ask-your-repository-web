// @flow
import { applyMiddleware, createStore } from 'redux';
import { middleware as flashMiddleware } from 'redux-flash';
import thunk from 'redux-thunk';
import rootReducer from '../state/rootReducer';

function configureStore() {
  let middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middleware, flashMiddleware()),
  );
}

export default configureStore;
