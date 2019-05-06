// @flow
import humps from 'humps';
import api from '../config/api';

class DriveService {
  static async create(teamId: string, data: { driveId: string, name: string, url: string }): any {
    const response = await api.post(`/teams/${teamId}/drives`, humps.decamelizeKeys(data));
    return humps.camelizeKeys(response.data);
  }

  static async delete(teamId: string, driveId: any): any {
    await api.delete(`teams/${teamId}/drives/${driveId}`);
  }
}

export default DriveService;
