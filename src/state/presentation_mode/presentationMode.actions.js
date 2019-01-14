// @flow
import * as actionTypes from './presentationMode.actionTypes';

export type TurnOnPresentationModeAction = {
  type: typeof actionTypes.PRESENTATION_MODE_ON,
};

export type TurnOffPresentationModeAction = {
  type: typeof actionTypes.PRESENTATION_MODE_OFF,
};
