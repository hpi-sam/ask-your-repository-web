// @flow
import * as actionTypes from './image.actionTypes';
import type { Tag } from '../../models/Tag';
import type { Image } from '../../models/Image';

export type SetImageAction = {
  type: typeof actionTypes.SET_IMAGE,
  image: Image,
};

export type AddTagAction = {
  type: typeof actionTypes.ADD_TAG,
  tag: Tag,
};

export type RemoveLastTagAction = {
  type: typeof actionTypes.REMOVE_LAST_TAG,
};
