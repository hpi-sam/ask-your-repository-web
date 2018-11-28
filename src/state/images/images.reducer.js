// @flow
import * as actionTypes from './images.actionTypes';
import type { Action } from '../Action';
import type { Image } from '../../models/Image';

export type ImagesState = Array<Image>;

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
