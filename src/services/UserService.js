// @flow
import humps from 'humps';
import api from '../config/api';
import type { User } from '../models/User';

export function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}

class UserService {
  static async get(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  static async list(): Promise<User[]> {
    const headers = authHeader();
    const response = await api.get('/users', {}, { headers });

    return response.data;
  }

  static async create(formData: FormData): Promise<User> {
    try {
      const response = await api.post('/users', formData);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static async login(username: string, password: string): Promise<User> {
    try {
      const response = await api.post('/users/authenticate', { username, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  static logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }
}

export default UserService;
