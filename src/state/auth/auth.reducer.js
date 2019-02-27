// @flow
import type { User } from '../../models/User';
import type { Action } from '../Action';
import * as actionTypes from './auth.actionTypes';

export type AuthState = {
  isAuthenticated: boolean,
  user: ?User,
};

export const initialState = {
  isAuthenticated: false,
  user: null,
};

function auth(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { isAuthenticated: true, user: action.user };
    case actionTypes.REGISTER:
      return state;
    case actionTypes.LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
}

export default auth;
