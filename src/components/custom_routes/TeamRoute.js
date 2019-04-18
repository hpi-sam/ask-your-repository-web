// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import type { AppState } from '../../state/AppState';

type Props = {
  hasActiveTeam: boolean,
  component: ComponentType<*>,
};

function TeamRoute({ hasActiveTeam, component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={() => (
        hasActiveTeam
          ? <AuthenticatedRoute {...rest} component={Component} />
          : <Redirect to="/select-team" />
      )}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  hasActiveTeam: !!state.activeTeam,
});

export default connect(mapStateToProps)(TeamRoute);
