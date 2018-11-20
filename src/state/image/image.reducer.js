// @flow
import * as actionTypes from './image.actionTypes';
import type { Action } from '../Action';
import type { Image } from '../../models/Image';

export type ImageState = ?Image;

function imageReducer(state: ImageState = null, action: Action) {
  switch (action.type) {
    case actionTypes.SET_IMAGE:
      return {
        id: action.id,
        src: action.src,
        tags: [],
      };
    case actionTypes.ADD_TAG:
      return state && {
        ...state,
        tags: [...state.tags, action.tag],
      };
    case actionTypes.REMOVE_LAST_TAG:
      return state && {
        ...state,
        tags: state.tags.slice(0, -1),
      };
    default:
      return state;
  }
}

export default imageReducer;