// @flow
import humps from 'humps';
import api from '../config/api';
import type { User, UserParams } from '../models/User';

export function authHeader() {
  // return authorization header with jwt token
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    if (user.token) {
      return { 'X-CSRF-TOKEN': user.token };
    }
  }
  return {};
}

class UserService {
  static async get(id: string): Promise<User> {
    const headers = authHeader();
    const response = await api.get(`/users/${id}`, {}, { headers });
    return response.data;
  }

  static async list(): Promise<User[]> {
    const headers = authHeader();
    const response = await api.get('/users', {}, { headers });

    return response.data;
  }

  static async create(formData: UserParams): Promise<User> {
    try {
      const response = await api.post('/users', formData);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async login(emailOrUsername: string, password: string): Promise<User> {
    try {
      const response = await api.post('/authentications', humps.decamelizeKeys({ emailOrUsername, password }));
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async logout() {
    try {
      const headers = authHeader();
      await api.delete('/authentications', {}, { headers });
    } finally {
      localStorage.removeItem('user');
    }
  }
}

export default UserService;
