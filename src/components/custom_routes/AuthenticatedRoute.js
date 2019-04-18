// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { AppState } from '../../state/AppState';

type Props = {
  component: ComponentType<*>,
  isAuthenticated: boolean,
};

function AuthenticatedRoute({
  isAuthenticated,
  component: Component,
  ...rest
}: Props) {
  return (
    <Route
      {...rest}
      render={router => (
        isAuthenticated
          ? <Component {...router} />
          : <Redirect to={{ pathname: '/login', state: { from: router.location } }} />
      )}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
