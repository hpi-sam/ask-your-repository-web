// @flow
import type { Image } from '../../models/Image';
import * as actionTypes from './images.actionTypes';

export type ReceiveImagesAction = {
  images: Array<Image>,
  type: typeof actionTypes.RECEIVE_IMAGES,
};
