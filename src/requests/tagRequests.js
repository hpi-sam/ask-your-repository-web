// @flow
import api from '../config/api';
import type { Tag } from '../models/Tag';

function fetchCreateTags(
  imageId: number,
  tags: Array<Tag>,
): Promise<any> {
  const requestData = {
    tags: tags.map(tag => tag.caption),
  };

  return api.post(`/images/${imageId}/tags`, requestData);
}

export default fetchCreateTags;
