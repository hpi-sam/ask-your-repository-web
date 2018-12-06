// @flow
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../config/configureStore';
import App from './App';

const store: any = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route path="/" component={App} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default Root;
