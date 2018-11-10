// @flow
import * as actionTypes from './image.actionTypes';
import type { Tag } from '../../models/Tag';

export type SetImageAction = {
  type: typeof actionTypes.SET_IMAGE,
  imageSrc: string,
};

export type AddTagAction = {
  type: typeof actionTypes.ADD_TAG,
  tag: Tag,
};

export type RemoveLastTagAction = {
  type: typeof actionTypes.REMOVE_LAST_TAG,
};
