// @flow
import * as actions from './images.actions';
import * as actionTypes from './images.actionTypes';
import type { Image } from '../../models/Image';

export function receiveImages(images: Image[]): actions.ReceiveImagesAction {
  return {
    images,
    type: actionTypes.RECEIVE_IMAGES,
  };
}

export default receiveImages;
