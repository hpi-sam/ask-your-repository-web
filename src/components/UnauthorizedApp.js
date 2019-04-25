// @flow
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import type { Location } from 'react-router';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import PasswordRequestForm from './auth/forgot_password/PasswordRequestForm';
import ResetPasswordForm from './auth/forgot_password/ResetPasswordForm';
import LandingPage from './landing_page/LandingPage';
import UnauthorizedFooter from './footer/UnauthorizedFooter';
import AuthorizedApp from './AuthorizedApp';
import AuthenticatedRoute from './custom_routes/AuthenticatedRoute';
import './UnauthorizedApp.scss';

type Props = {
  location: Location,
};

class UnauthorizedApp extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="UnauthorizedApp">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/forgot-password" component={PasswordRequestForm} />
            <Route path="/reset-password" component={ResetPasswordForm} />
            <Route exact path="/" component={LandingPage} />
            <AuthenticatedRoute path="*" component={AuthorizedApp} />
          </Switch>
        </div>
        <UnauthorizedFooter />
      </Fragment>
    );
  }
}

export default UnauthorizedApp;