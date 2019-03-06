// @flow
import type { Tag } from './Tag';

export type Image = {
  id: string,
  url: string,
  tags: Array<Tag>,
  userTags: Array<Tag>,
  labelTags: Array<Tag>,
  textTags: Array<Tag>,
  score: number,
};
