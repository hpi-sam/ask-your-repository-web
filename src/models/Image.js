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
  fileDate: string,
};

export type DeletableImage = Image & {
  delete: () => Promise<void>,
};

export type TaggableImage = Image & {
  addTag: (tag: Tag) => void,
  removeTag: (tag: Tag) => void,
};

export type PresentationImages = {
  images: Image[],
  images_count: number,
  search: string,
};
