// @flow
import * as actions from './teamSidebar.actions';
import * as actionTypes from './teamSidebar.actionTypes';

export function closeTeamSidebar(): actions.CloseTeamSidebarAction {
  return { type: actionTypes.CLOSE_TEAM_SIDEBAR };
}

export function openTeamSidebar(): actions.OpenTeamSidebarAction {
  return { type: actionTypes.OPEN_TEAM_SIDEBAR };
}
