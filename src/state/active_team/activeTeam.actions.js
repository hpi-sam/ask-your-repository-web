// @flow
import * as actionTypes from './activeTeam.actionTypes';
import type { Team } from '../../models/Team';

export type SetActiveTeamAction = {
  type: typeof actionTypes.SET_ACTIVE_TEAM,
  team: Team,
};
