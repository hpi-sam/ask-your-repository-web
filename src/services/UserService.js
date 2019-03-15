// @flow
import humps from 'humps';
import api from '../config/api';
import type { User, UserParams } from '../models/User';

class UserService {
  static async get(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  static async list(): Promise<User[]> {
    const response = await api.get('/users', {});

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
}

export default UserService;
