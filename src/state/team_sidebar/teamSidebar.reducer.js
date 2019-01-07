// @flow
import * as actionTypes from './teamSidebar.actionTypes';
import type { Action } from '../Action';

export type TeamSidebarState = { isOpen: boolean };
export const initialState = { isOpen: true };

function teamSidebar(state: TeamSidebarState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.OPEN_TEAM_SIDEBAR:
      return { ...state, isOpen: true };
    case actionTypes.CLOSE_TEAM_SIDEBAR:
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export default teamSidebar;
