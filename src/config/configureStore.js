// @flow
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'connected-react-router';
import { middleware as flashMiddleware } from 'redux-flash';
import type { History } from 'history';
import thunk from 'redux-thunk';
import createRootReducer from '../state/rootReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['activeTeam'],
};

function configureStore(history: History) {
  let middleware = [
    thunk,
    flashMiddleware(),
    routerMiddleware(history),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middleware = [...middleware, logger];
  }

  const rootReducer = createRootReducer(history);
  const persistedReducer: any = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
