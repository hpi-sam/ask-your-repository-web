// @flow
import * as actions from './activeTeam.actions';
import * as actionTypes from './activeTeam.actionTypes';
import type { Team } from '../../models/Team';

export function setActiveTeam(team: Team): actions.SetActiveTeamAction {
  return {
    type: actionTypes.SET_ACTIVE_TEAM,
    team,
  };
}

export default setActiveTeam;
