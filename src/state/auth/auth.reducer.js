// @flow
import type { User } from '../../models/User';
import type { Action } from '../Action';
import * as actionTypes from './auth.actionTypes';

const storedUser = localStorage.getItem('user');
let user;
if (storedUser) {
  user = JSON.parse(storedUser);
}

export type AuthState = {
    loggedIn: boolean,
    user: ?User,
};

export const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null };

function auth(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { loggedIn: true, user: action.user };
    case actionTypes.REGISTER:
      return state;
    case actionTypes.LOGOUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

export default auth;
