// @flow
import { applyMiddleware, createStore } from 'redux';
import type { Dispatch } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { middleware as flashMiddleware } from 'redux-flash';
import thunk from 'redux-thunk';
import createRootReducer from '../state/rootReducer';
import type { AppState } from '../state/AppState';
import type { Action } from '../state/Action';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['activeTeam'],
};

function configureStore() {
  let middleware = [
    thunk,
    flashMiddleware(),
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  const rootReducer = createRootReducer(history);
  const persistedReducer: any = persistReducer(persistConfig, rootReducer);

  const store = createStore<AppState, Action, Dispatch<Action>>(
    persistedReducer,
    applyMiddleware(...middleware),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
