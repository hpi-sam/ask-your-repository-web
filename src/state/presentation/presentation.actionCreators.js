// @flow
import * as actions from './presentation.actions';
import * as actionTypes from './presentation.actionTypes';
import type { Image } from '../../models/Image';

export function startPresentation(images: Image[]): actions.StartPresentationAction {
  return {
    type: actionTypes.START_PRESENTATION,
    images,
  };
}

export default startPresentation;
