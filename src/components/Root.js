// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../config/configureStore';
import ImagesIndex from './images/ImagesIndex';
import App from './App';

const store: any = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route exact path="/images" component={ImagesIndex} />
        </div>
      </Router>
    </Provider>
  );
}

export default Root;
