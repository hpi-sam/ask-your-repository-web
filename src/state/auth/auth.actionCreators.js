// @flow
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { push } from 'connected-react-router';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';
import * as actionTypes from './auth.actionTypes';
import type { UserParams } from '../../models/User';

export function login(email: string, password: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await AuthService.login(email, password);
      dispatch({ type: actionTypes.LOGIN, user });
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

export function loginWithGoogle(googleUser: any) {
  return async(dispatch: Function): Promise<void> => {
    try {
      const user = await AuthService.loginWithGoogle(googleUser.getAuthResponse().id_token);
      dispatch({ type: actionTypes.LOGIN, user, googleUser });
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
export function logout() {
  return async (dispatch: Function): Promise<void> => {
    await AuthService.logout();
    dispatch({ type: actionTypes.LOGOUT });
    dispatch(push('/login'));
    dispatch(flashSuccessMessage('Successfully logged out'));
  };
}

export function changePassword(id: string, oldPassword: string, newPassword: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      await UserService.changePassword(id, oldPassword, newPassword);
      dispatch({ type: actionTypes.CHANGE_PASSWORD });
      dispatch(push('/settings'));
      dispatch(flashSuccessMessage('Successfully changed password'));
    } catch (error) {
      dispatch(flashErrorMessage('Password could not be changed.'));
    }
  };
}

export function register(userParameters: UserParams) {
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
