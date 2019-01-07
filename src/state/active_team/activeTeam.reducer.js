// @flow
import * as actionTypes from './activeTeam.actionTypes';
import type { Action } from '../Action';
import type { Team } from '../../models/Team';

export type ActiveTeamState = ?Team;
export const initialState = null;

function activeTeam(state: ActiveTeamState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TEAM:
      return action.team;
    default:
      return state;
  }
}

export default activeTeam;
