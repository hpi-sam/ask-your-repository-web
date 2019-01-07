// @flow
import api from '../config/api';
import type { Team } from '../models/Team';

class TeamService {
  static async list(): Promise<Team[]> {
    const response = await api.get('/teams');
    return response.data.teams;
  }

  static async create(data: { name: string }): Promise<Team> {
    const response = await api.post('/teams', data);
    return response.data;
  }
}

export default TeamService;
