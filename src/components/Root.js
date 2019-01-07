// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from '../config/configureStore';
import configureSocket from '../config/configureSocket';
import App from './App';

const history = createBrowserHistory();
const store: any = configureStore(history);
configureSocket(store);

function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" component={App} />
      </ConnectedRouter>
    </Provider>
  );
}

export default Root;
