// @flow
import * as actionTypes from './presentationMode.actionTypes';
import type { Action } from '../Action';

export type PresentationModeState = { isActive: boolean };
export const initialState = { isActive: false };

function presentationMode(state: PresentationModeState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.TURN_ON_PRESENTATION_MODE:
      return { ...state, isActive: true };
    case actionTypes.TURN_OFF_PRESENTATION_MODE:
      return { ...state, isActive: false };
    default:
      return state;
  }
}

export default presentationMode;
