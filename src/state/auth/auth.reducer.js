// @flow
import type { User } from '../../models/User';
import type { Action } from '../Action';
import * as actionTypes from './auth.actionTypes';

const storedUser = localStorage.getItem('user');
const user = JSON.parse(storedUser);

export type AuthState = {
    loggedIn: boolean,
    user: User,
};

export const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

function auth(state: AuthState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { loggedIn: true, user: action.user };
    case actionTypes.REGISTER:
      return state;
    case actionTypes.LOGOUT:
      return state;
    default:
      return state;
  }
}

export default auth;
