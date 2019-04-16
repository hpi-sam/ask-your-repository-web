// @flow
import humps from 'humps';
import api from '../config/api';
import type { Team } from '../models/Team';

class InviteService {
  static async join(key: string): Promise<Team> {
    const response = await api.post(`/invites/${key}`);
    const team: any = humps.camelizeKeys(response.data);
    return team;
  }
}

export default InviteService;
