// @flow
import humps from 'humps';
import api from '../config/api';

class DriveService {
  static async create(teamId: string, data: { driveId: string }): any {
    const response = await api.post(`/teams/${teamId}/drives`, humps.decamelizeKeys(data));
    return humps.camelizeKeys(response.data);
  }
}

export default DriveService;
