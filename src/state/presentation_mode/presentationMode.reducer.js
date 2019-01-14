// @flow
import * as actionTypes from './presentationMode.actionTypes';
import type { Action } from '../Action';

export type PresentationModeState = { isActive: boolean };
export const initialState = { isActive: false };

function presentationMode(state: PresentationModeState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.PRESENTATION_MODE_ON:
      return { ...state, isActive: true };
    case actionTypes.PRESENTATION_MODE_OFF:
      return { ...state, isActive: false };
    default:
      return state;
  }
}

export default presentationMode;
