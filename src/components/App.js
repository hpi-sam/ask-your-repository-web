// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import FlashMessages from './utility/flash/FlashMessages';
import AuthorizedApp from './AuthorizedApp';
import UnauthorizedApp from './UnauthorizedApp';
import type { AppState } from '../state/AppState';
import './App.scss';

type Props = {
  isAuthenticated: boolean,
};

function App(props: Props) {
  return (
    <div className="App">
      <FlashMessages />
      <Switch>
        <Route path="/" component={props.isAuthenticated ? AuthorizedApp : UnauthorizedApp} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
