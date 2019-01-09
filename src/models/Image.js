// @flow
import type { Tag } from './Tag';

export type Image = {
  id: string,
  url: string,
  tags: Array<Tag>,
  score: number,
};
