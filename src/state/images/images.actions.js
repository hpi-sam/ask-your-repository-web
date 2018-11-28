// @flow
import type { Artifact } from '../../models/Artifact';
import * as actionTypes from './images.actionTypes';

export type ReceiveImagesAction = {
  images: Array<Artifact>,
  type: actionTypes.RECEIVE_IMAGES,
};
