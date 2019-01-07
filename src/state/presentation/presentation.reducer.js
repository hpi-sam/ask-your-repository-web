// @flow
import * as actionTypes from './presentation.actionTypes';
import type { Action } from '../Action';
import type { Presentation } from '../../models/Presentation';

export type PresentationState = ?Presentation;
export const initialState = null;

function presentationReducer(state: PresentationState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.START_PRESENTATION:
      return { images: action.images };
    default:
      return state;
  }
}

export default presentationReducer;
