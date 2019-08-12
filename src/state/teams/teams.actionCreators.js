// @flow
import * as actions from './teams.actions';
import * as actionTypes from './teams.actionTypes';
import type { Team } from '../../models/Team';

export function receiveTeams(teams: Team[]): actions.ReceiveTeamsAction {
  return {
    type: actionTypes.RECEIVE_TEAMS,
    teams,
  };
}

export function addTeam(team: Team): actions.AddTeamAction {
  return {
    type: actionTypes.ADD_TEAM,
    team,
  };
}
