// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from '../config/configureStore';
import configureSocket from '../config/configureSocket';
import TeamRoute from './custom_routes/TeamRoute';
import TeamSelect from './team_select/TeamSelect';
import App from './App';

const history = createBrowserHistory();
const { store, persistor }: any = configureStore(history);
configureSocket(store);

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/select-team" component={TeamSelect} />
            <TeamRoute path="/" component={App} />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default Root;
