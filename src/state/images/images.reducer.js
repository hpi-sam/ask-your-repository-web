// @flow
import * as actionTypes from './images.actionTypes';
import type { Action } from '../Action';
import type { Artifact } from '../../models/Artifact';

export type ImagesState = Array<Artifact>;

function imagesReducer(state: ImagesState = [], action: Action) {
  switch (action.type) {
    case actionTypes.RECEIVE_IMAGES: {
      const ids = action.images.map(image => image.id);
      return [
        ...state.filter(image => !ids.includes(image.id)),
        ...action.images,
      ];
    }
    default:
      return state;
  }
}

export default imagesReducer;
