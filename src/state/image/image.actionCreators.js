// @flow
import * as actions from './image.actions';
import * as actionTypes from './image.actionTypes';
import type { Tag } from '../../models/Tag';

export function setImage(id: number, url: string): actions.SetImageAction {
  return {
    type: actionTypes.SET_IMAGE,
    id,
    url,
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
