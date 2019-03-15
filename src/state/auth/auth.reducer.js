// @flow
import type { User } from '../../models/User';
import type { Action } from '../Action';
import * as actionTypes from './auth.actionTypes';

export type AuthState = {
  isAuthenticated: boolean,
  user: ?User,
  googleUser: any,
};

export const initialState = {
  isAuthenticated: false,
  user: null,
  googleUser: null,
};

function auth(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isAuthenticated: true, user: action.user};
    case actionTypes.LOGIN_WITH_GOOGLE:
      return { isAuthenticated: true, user: action.user, googleUser: action.googleUser};
    case actionTypes.REGISTER:
      return state;
    case actionTypes.CHANGE_PASSWORD:
      return state;
    case actionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export default auth;
