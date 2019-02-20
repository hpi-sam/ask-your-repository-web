// @flow

import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import UserService from '../../services/UserService';
import * as actionTypes from './auth.actionTypes';
import { history } from '../../config/configureStore';
import type { User } from '../../models/User';

export function login(email: string, password: string) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.login(email, password);
      dispatch({ type: actionTypes.LOGIN, user });
      history.push('/');
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
    history.push('/login');
    dispatch(flashSuccessMessage('Successfully logged out'));
  };
}

export function register(userParameters: User) {
  return async (dispatch: Function): Promise<void> => {
    try {
      const user = await UserService.create(userParameters);
      dispatch({ type: actionTypes.REGISTER, user });
      history.push('/login');
      dispatch(flashSuccessMessage('Successfully registered.'));
    } catch (error) {
      dispatch(flashErrorMessage((error.response.data.error.toString())));
    }
  };
}
