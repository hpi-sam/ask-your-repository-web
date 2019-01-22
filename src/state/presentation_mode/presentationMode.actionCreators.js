// @flow
import * as actions from './presentationMode.actions';
import * as actionTypes from './presentationMode.actionTypes';

export function turnOnPresentationMode(): actions.TurnOnPresentationModeAction {
  return { type: actionTypes.TURN_ON_PRESENTATION_MODE };
}

export function turnOffPresentationMode(): actions.TurnOffPresentationModeAction {
  return { type: actionTypes.TURN_OFF_PRESENTATION_MODE };
}
