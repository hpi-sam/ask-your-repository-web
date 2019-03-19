// @flow

import * as actionTypes from './auth.actionTypes';
import type { User } from '../../models/User';

export type LoginAction = {
    type: typeof actionTypes.LOGIN,
    user: User,
};

export type LogoutAction = {
    type: typeof actionTypes.LOGOUT,
};

export type UpdateUserAction = {
    type: typeof actionTypes.UPDATE_USER,
}
export type ChangePasswordAction = {
    type: typeof actionTypes.CHANGE_PASSWORD,
};

export type RegisterAction = {
    type: typeof actionTypes.REGISTER,
    user: User,
};
