// @flow
import humps from 'humps';
import api from '../config/api';
import type { Team } from '../models/Team';

class TeamService {
  static async list(): Promise<Team[]> {
    const response = await api.get('/teams');
    const teams: any = humps.camelizeKeys(response.data.teams);
    return teams;
  }

  static async listAll(): Promise<Team[]> {
    const response = await api.get('/teams/all');
    const teams: any = humps.camelizeKeys(response.data.teams);
    return teams;
  }

  static async create(data: { name: string }): Promise<Team> {
    const response = await api.post('/teams', data);
    return response.data;
  }

  static async get(id: string): Promise<Team> {
    const response = await api.get(`/teams/${id}`);
    const team: any = humps.camelizeKeys(response.data);
    return team;
  }
}

export default TeamService;
