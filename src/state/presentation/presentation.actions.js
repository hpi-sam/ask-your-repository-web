// @flow
import * as actionTypes from './presentation.actionTypes';
import type { Image } from '../../models/Image';

export type StartPresentationAction = {
  type: typeof actionTypes.START_PRESENTATION,
  images: Array<Image>,
};
