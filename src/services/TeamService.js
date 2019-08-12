// @flow
import humps from 'humps';
import type { Dispatch } from 'redux';
import api from '../config/api';
import { receiveTeams, addTeam } from '../state/teams/teams.actionCreators';
import type { Team } from '../models/Team';

class TeamService {
  static list(): any {
    return async (dispatch: Dispatch) => {
      try {
        const response = await api.get('/teams');
        const teams: any = humps.camelizeKeys(response.data.teams);
        return dispatch(receiveTeams(teams));
      } catch (error) {
        return error;
      }
    };
  }

  static async listAll(): Promise<Team[]> {
    const response = await api.get('/teams/all');
    const teams: any = humps.camelizeKeys(response.data.teams);
    return teams;
  }

  static create(data: { name: string }): any {
    return async (dispatch: Dispatch) => {
      try {
        const response = await api.post('/teams', data);
        const team: any = humps.camelizeKeys(response.data);
        return dispatch(addTeam(team));
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }

  static async get(id: string): Promise<Team> {
    const response = await api.get(`/teams/${id}`);
    const team: any = humps.camelizeKeys(response.data);
    return team;
  }
}

export default TeamService;
