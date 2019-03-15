// @flow
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { push } from 'connected-react-router';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import * as actionTypes from './auth.actionTypes';
import type { UserCreateParams, User } from '../../models/User';

export function login(email: string, password: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const { csrfToken, ...user } = await AuthService.login(email, password);
      dispatch({ type: actionTypes.LOGIN, user, csrfToken });
      dispatch(push('/'));
      dispatch(flashSuccessMessage('Successfully logged in'));
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Could not establish a connection to the server.';

      dispatch(flashErrorMessage(message));
    }
  };
}

export function loginWithGoogle(idToken: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const { csrfToken, ...user } = await AuthService.loginWithGoogle(idToken);
      dispatch({ type: actionTypes.LOGIN, user, csrfToken });
      dispatch(push('/'));
      dispatch(flashSuccessMessage('Successfully logged in'));
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Could not establish a connection to the server.';

      dispatch(flashErrorMessage(message));
    }
  };
}

export function connectGoogle(id: string, idToken: any) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.connectToGoogle(id, idToken);
      dispatch({ type: actionTypes.UPDATE_USER, user });
      dispatch(flashSuccessMessage('Successfully connected Google'));
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Could not establish a connection to the server.';

      dispatch(flashErrorMessage(message));
    }
  };
}

export function logout() {
  return async (dispatch: Function): Promise<void> => {
    await AuthService.logout();
    dispatch({ type: actionTypes.LOGOUT });
    dispatch(push('/'));
    dispatch(flashSuccessMessage('Successfully logged out'));
  };
}

export function changePassword(id: string, oldPassword: string, password: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      await UserService.update(id, { password, oldPassword });
      dispatch({ type: actionTypes.CHANGE_PASSWORD });
      dispatch(push('/settings'));
      dispatch(flashSuccessMessage('Successfully changed password'));
    } catch (error) {
      dispatch(flashErrorMessage('Password could not be changed.'));
    }
  };
}

export function register(userParameters: UserCreateParams) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.create(userParameters);
      dispatch({ type: actionTypes.REGISTER, user });
      dispatch(push('/login'));
      dispatch(flashSuccessMessage('Successfully registered.'));
    } catch (error) {
      dispatch(flashErrorMessage(error.response.data.error.toString()));
    }
  };
}

export function refreshUser(id: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.get(id);
      dispatch({ type: actionTypes.UPDATE_USER, user });
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : error.message;

      dispatch(flashErrorMessage(message));
    }
  };
}

export function allowDriveAccess(id: string, authCode: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.grantDriveAccess(id, authCode);
      dispatch({ type: actionTypes.UPDATE_USER, user });
      dispatch(flashSuccessMessage('Successfully connected Google'));
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Could not establish a connection to the server.';

      dispatch(flashErrorMessage(message));
    }
  };
}

export function revokeDriveAccess(user: User) {
  return async (dispatch: Function): Promise<void> => {
    try {
      await UserService.revokeDriveAccess(user.id);
      const newUser = { ...user };
      newUser.google.hasOfflineAccess = false;
      dispatch({
        type: actionTypes.UPDATE_USER,
        user: newUser,
      });
      dispatch(flashSuccessMessage('Successfully revoked Google Drive access'));
    } catch (error) {
      const message = error.response
        ? error.response.data.error
        : 'Could not establish a connection to the server.';

      dispatch(flashErrorMessage(message));
    }
  };
}
