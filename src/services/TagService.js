// @flow
import humps from 'humps';
import api from '../config/api';
import type { Tag } from '../models/Tag';

class TagService {
  static async suggested(teamId: string, tags: Tag[]): Promise<Tag[]> {
    const params = { teamId, tags };
    const response = await api.get('/tags/suggested', { params: humps.decamelizeKeys(params) });
    return response.data.tags;
  }
}

export default TagService;
