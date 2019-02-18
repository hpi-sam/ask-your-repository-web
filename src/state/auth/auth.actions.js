// @flow

import * as actionTypes from './auth.actionTypes';
import type { User } from '../../models/User';

export type LoginAction = {
    type: actionTypes.LOGIN,
    user: User,
};

export type LogoutAction = {
    type: actionTypes.LOGOUT,
    user: User,
};

export type RegisterAction = {
    type: actionTypes.REGISTER,
    user: User,
};
