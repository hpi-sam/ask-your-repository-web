// @flow
import * as actions from './image.actions';
import * as actionTypes from './image.actionTypes';
import type { Tag } from '../../models/Tag';
import type { Image } from '../../models/Image';

export function setImage(image: Image): actions.SetImageAction {
  return {
    type: actionTypes.SET_IMAGE,
    image,
  };
}

export function addTag(tag: Tag): actions.AddTagAction {
  return {
    type: actionTypes.ADD_TAG,
    tag,
  };
}

export function removeLastTag(): actions.RemoveLastTagAction {
  return { type: actionTypes.REMOVE_LAST_TAG };
}
