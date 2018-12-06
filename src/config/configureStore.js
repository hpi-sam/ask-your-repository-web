// @flow
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash';
import thunk from 'redux-thunk';
import createRootReducer from '../state/rootReducer';

function configureStore(history: any) {
  let middleware = [
    thunk,
    flashMiddleware(),
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  return createStore(
    createRootReducer(history),
    applyMiddleware(...middleware),
  );
}

export default configureStore;
