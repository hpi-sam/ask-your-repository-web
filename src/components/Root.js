// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { PersistGate } from 'redux-persist-erksch/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from '../config/configureStore';
import configureAxios from '../config/configureAxios';
import App from './App';

const { store, persistor }: any = configureStore();
configureAxios(store);

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

if (window.Cypress) window.store = store;

export default Root;
