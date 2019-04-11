// @flow
import humps from 'humps';
import api from '../config/api';
import type { Team } from '../models/Team';

class InviteService {
  static async join(key: string): Promise<Team> {
    const team: any = humps.camelizeKeys(await api.post(`/invites/${key}`));
    return team;
  }
}

export default InviteService;
