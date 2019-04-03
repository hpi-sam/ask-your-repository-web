// @flow
import type { User } from '../../models/User';
import type { Action } from '../Action';
import * as actionTypes from './auth.actionTypes';

export type AuthState = {
  isAuthenticated: boolean,
  user: ?User,
  csrfToken: ?string,
};

export const initialState = {
  isAuthenticated: false,
  user: null,
  csrfToken: null,
};

function auth(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        csrfToken: action.csrfToken,
      };
    case actionTypes.REGISTER:
      return state;
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.CHANGE_PASSWORD:
      return state;
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        csrfToken: null,
      };
    default:
      return state;
  }
}

export default auth;
