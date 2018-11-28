// @flow
import * as actions from './images.actions';
import * as actionTypes from './images.actionTypes';

export function receiveImages(images: Artefact[]): actions.ReceiveImagesAction {
  return {
    images,
    type: actionTypes.RECEIVE_IMAGES,
  };
}

export default receiveImages;
