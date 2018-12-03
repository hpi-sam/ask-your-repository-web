// @flow
import api from '../../../config/api';
import type { Tag } from '../../../models/Tag';

function fetchCreateTags(
  imageId: number,
  tags: Array<Tag>,
): Promise<any> {
  return api.post(`/images/${imageId}/tags`, { tags });
}

export default fetchCreateTags;
