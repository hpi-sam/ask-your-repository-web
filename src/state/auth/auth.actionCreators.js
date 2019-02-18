// @flow

import { flashSuccessMessage, flashErrorMessage } from 'redux-flash';
import UserService from '../../services/UserService';
import * as actionTypes from './auth.actionTypes';
import * as actions from './auth.actions';
import { history } from '../../config/configureStore';

export function login(username, password) {
  return async (dispatch: Function): void => {
    try {
      const user = await UserService.login(username, password);
      dispatch({ type: actionTypes.LOGIN, user });
      history.push('/');
      dispatch(flashSuccessMessage('Successfully logged in'));
    } catch (error) {
      dispatch(flashErrorMessage((error.toString())));
    }
  };
}

export function logout(): actions.LogoutAction {
  UserService.logout();
  return { type: actionTypes.LOGOUT };
}

export function register(userParameters) {
  return (dispatch: Function): void => {
    try {
      const user = UserService.create(userParameters);
      dispatch({ type: actionTypes.REGISTER, user });
      history.push('/login');
      dispatch(flashSuccessMessage('Successfully registered.'));
    } catch (error) {
      dispatch(flashErrorMessage((error.toString())));
    }
  };
}
