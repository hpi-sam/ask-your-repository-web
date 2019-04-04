// @flow
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { flashErrorMessage } from 'redux-flash';
import createGoogleAuthInstance from '../../config/createGoogleAuthInstance';
import type { AppState } from '../../state/AppState';
import type { User } from '../../models/User';
import {
  connectGoogle, allowDriveAccess, refreshUser, revokeDriveAccess,
} from '../../state/auth/auth.actionCreators';
import googleDriveBadge from '../../assets/googleDrive.png';
import './GooglePermissions.scss';

type Props = {
  user: User,
  dispatch: Function,
};

type State = {
  googleAuth: any,
};

class GooglePermissions extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      googleAuth: null,
    };
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(refreshUser(user.id));

    createGoogleAuthInstance().then((googleAuth) => {
      this.setState({ googleAuth });
    });
  }

  isConnected = () => {
    const { google } = this.props.user;
    return !!google;
  };

  hasGoogleDriveAccess = () => {
    const { google } = this.props.user;
    if (google) {
      return google.hasOfflineAccess;
    }
    return false;
  };

  handleConnectGoogleSuccess = (response) => {
    const { user, dispatch } = this.props;
    dispatch(connectGoogle(user.id, response.getAuthResponse().id_token));
  };

  handleConnectGoogleFailure = () => {
    const { dispatch } = this.props;
    dispatch(flashErrorMessage('Connect to Google failed'));
  };

  requestAdditionalPermissions = () => {
    const { googleAuth } = this.state;
    if (!googleAuth) {
      createGoogleAuthInstance().then((freshGoogleAuth) => {
        this.grantGoogleOfflineAccess(freshGoogleAuth);
      });
    } else {
      this.grantGoogleOfflineAccess(googleAuth);
    }
  };

  grantGoogleOfflineAccess = (googleAuth) => {
    googleAuth.grantOfflineAccess(
      { scope: 'profile email https://www.googleapis.com/auth/drive' },
    ).then(this.additionalPermissionsSuccess, this.additionalPermissionsError);
  };

  additionalPermissionsSuccess = (googleResponse) => {
    const { user, dispatch } = this.props;
    dispatch(allowDriveAccess(user.id, googleResponse.code));
  };

  additionalPermissionsError = () => {
    const { dispatch } = this.props;
    dispatch(flashErrorMessage('Google Drive permissions declined'));
  };

  revokeDriveAccess = () => {
    const { dispatch, user } = this.props;
    dispatch(revokeDriveAccess(user));
  };

  render() {
    return (
      <div className="GooglePermissions">      
        {!this.isConnected() && (
          <GoogleLogin
            className="google-button"
            buttonText="Connect your account to Google"
            onSuccess={this.handleConnectGoogleSuccess}
            onFailure={this.handleConnectGoogleFailure}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          />
        )}
        {this.isConnected() && (this.hasGoogleDriveAccess() ? (
          <button type="button" className="google-button" onClick={this.revokeDriveAccess}>
            <div>
              <img src={googleDriveBadge} alt="Google Drive badge" height="18" width="18" />
            </div>
            <span>
              Revoke Google Drive Access
            </span>
          </button>
        ) : (
          <button type="button" className="google-button" onClick={this.requestAdditionalPermissions}>
            <div>
              <img src={googleDriveBadge} alt="Google Drive badge" height="18" width="18" />
            </div>
            <span>
              Connect to Google Drive™
            </span>
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(GooglePermissions);
