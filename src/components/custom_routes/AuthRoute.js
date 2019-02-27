// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { AppState } from '../../state/AppState';

type Props = {
  isAuthenticated: boolean,
  component: ComponentType<*>,
};

function TeamRoute({ isAuthenticated, component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={router => (
        isAuthenticated
          ? <Component {...router} />
          : <Redirect to="/login" />
      )}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(TeamRoute);
