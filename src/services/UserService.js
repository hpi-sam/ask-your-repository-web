// @flow
import humps from 'humps';
import api from '../config/api';
import type { User, UserCreateParams, UserUpdateParams } from '../models/User';

class UserService {
  static async get(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async update(id: string, params: UserUpdateParams): Promise<User> {
    const response = await api.patch(`/users/${id}`, humps.decamelizeKeys(params));
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async connectToGoogle(id: string, idToken: string): Promise<User> {
    const params = { provider: 'google', idToken };
    const response = await api.put(`/users/${id}/oauths/google`, humps.decamelizeKeys(params));
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async grantDriveAccess(id: string, authCode: string): Promise<User> {
    const response = await api.patch(`/users/${id}/oauths/google`, humps.decamelizeKeys({ authCode }));
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async revokeDriveAccess(id: string): Promise<User> {
    const response = await api.delete(`/users/${id}/oauths/google/scopes`);
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async list(): Promise<User[]> {
    const response = await api.get('/users', {});
    const users: any = humps.camelizeKeys(response.data);
    return users;
  }

  static async create(formData: UserCreateParams): Promise<User> {
    const response = await api.post('/users', formData);
    const user: any = humps.camelizeKeys(response.data);
    return user;
  }

  static async changePassword(password: string, resetToken: string) {
    const params = {
      password,
      resetToken,
    };
    await api.put('/password_resets', humps.decamelizeKeys(params));
  }
}

export default UserService;
