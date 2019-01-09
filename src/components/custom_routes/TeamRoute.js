// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { AppState } from '../../state/AppState';

type Props = {
  hasActiveTeam: boolean,
  component: ComponentType<*>,
};

function TeamRoute({ hasActiveTeam, component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={router => (
        hasActiveTeam
          ? <Component {...router} />
          : <Redirect to="/select-team" />
      )}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  hasActiveTeam: !!state.activeTeam,
});

export default connect(mapStateToProps)(TeamRoute);
