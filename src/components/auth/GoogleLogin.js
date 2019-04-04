// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flashErrorMessage } from 'redux-flash';
import GoogleLoginButton from 'react-google-login';
import { loginWithGoogle } from '../../state/auth/auth.actionCreators';
import './Forms.scss';

type Props = {
  dispatch: Function,
};

class GoogleLogin extends Component<Props> {
  handleGoogleSuccess = (response) => {
    this.props.dispatch(loginWithGoogle(response.getAuthResponse().id_token));
  };

  handleGoogleFailure = () => {
    const { dispatch } = this.props;
    dispatch(flashErrorMessage('Google login failed'));
  };

  componentDidCatch() {}

  render() {
    return (
      <GoogleLoginButton
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        className="Form__external-login__google"
        onSuccess={this.handleGoogleSuccess}
        onFailure={this.handleGoogleFailure}
        theme={"dark"}
      />
    );
  }
}

export default connect()(GoogleLogin);
