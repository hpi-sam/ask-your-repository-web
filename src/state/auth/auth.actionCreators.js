// @flow
import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import { push } from 'connected-react-router';
import UserService from '../../services/UserService';
import * as actionTypes from './auth.actionTypes';
import type { UserParams } from '../../models/User';

export function login(email: string, password: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.login(email, password);
      dispatch({ type: actionTypes.LOGIN, user });
      dispatch(push('/'));
      dispatch(flashSuccessMessage('Successfully logged in'));
    } catch (error) {
      dispatch(flashErrorMessage((error.response.data.error.toString())));
    }
  };
}

export function logout() {
  if (!localStorage.getItem('user')) return { type: actionTypes.LOGOUT };
  return async (dispatch: Function): Promise<void> => {
    UserService.logout();
    dispatch({ type: actionTypes.LOGOUT });
    dispatch(push('/login'));
    dispatch(flashSuccessMessage('Successfully logged out'));
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
      dispatch(flashErrorMessage((error.response.data.error.toString())));
    }
  };
}
