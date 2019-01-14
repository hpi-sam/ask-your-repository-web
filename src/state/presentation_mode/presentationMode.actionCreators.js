// @flow
import * as actions from './presentationMode.actions';
import * as actionTypes from './presentationMode.actionTypes';

export function turnOnPresentationMode(): actions.TurnOnPresentationModeAction {
  return { type: actionTypes.PRESENTATION_MODE_ON };
}

export function turnOffPresentationMode(): actions.TurnOffPresentationModeAction {
  return { type: actionTypes.PRESENTATION_MODE_OFF };
}
