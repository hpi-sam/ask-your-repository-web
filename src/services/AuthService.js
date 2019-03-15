// @flow
import humps from 'humps';
import api from '../config/api';
import type { User } from '../models/User';

class AuthService {
  static async login(emailOrUsername: string, password: string): Promise<User> {
    try {
      const response = await api.post('/authentications', humps.decamelizeKeys({ emailOrUsername, password }));
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async loginWithGoogle(idToken: string): Promise<User> {
    try {
      const response = await api.post('/authentications', humps.decamelizeKeys({ idToken }));
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async logout() {
    try {
      await api.delete('/authentications');
    } finally {
      localStorage.removeItem('user');
    }
  }
}

export default AuthService;
