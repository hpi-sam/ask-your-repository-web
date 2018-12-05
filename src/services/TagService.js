// @flow
import api from '../config/api';
import type { Tag } from '../models/Tag';

class TagService {
  static async suggested(tags: Tag[]): Promise<Tag[]> {
    const params = { tags };
    const response = await api.get('/tags/suggested', { params });
    return response.data.tags;
  }
}

export default TagService;
