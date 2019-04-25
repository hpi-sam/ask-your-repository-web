// @flow
import * as actionTypes from './presentation.actionTypes';
import type { Action } from '../Action';
import type { Presentation } from '../../models/Presentation';

export type PresentationState = ?Presentation;
export const initialState = { searching: false, images: [] };

function presentationReducer(state: PresentationState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.START_PRESENTATION:
      return { ...state, images: action.images, searching: false };
    case actionTypes.SYNCHRONIZED_SEARCH:
      return { ...state, searching: true };
    default:
      return state;
  }
}

export default presentationReducer;
