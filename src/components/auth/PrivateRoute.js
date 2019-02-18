// @flow
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }: Object) {
  return (
    <Route
      {...rest}
      render={props => (
        localStorage.getItem('user')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />
  );
}

export default PrivateRoute;
