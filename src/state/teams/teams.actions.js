// @flow
import * as actionTypes from './teams.actionTypes';
import type { Team } from '../../models/Team';

export type ReceiveTeamsAction = {
  type: typeof actionTypes.RECEIVE_TEAMS,
  teams: Team[],
};

export type AddTeamAction = {
  type: typeof actionTypes.ADD_TEAM,
  team: Team,
};
