// @flow
import { useSelector } from 'react-redux';
import * as actionTypes from './teams.actionTypes';
import * as actions from './teams.actions';
import type { Team } from '../../models/Team';
import type { AppState } from '../AppState';

export type TeamsState = Team[];
export type Action = actions.ReceiveTeamsAction;

export const initialState = [];

function teams(state: TeamsState = initialState, action: Action) {
  switch (action.type) {
    case actionTypes.RECEIVE_TEAMS:
      return action.teams;
    case actionTypes.ADD_TEAM:
      return [...state, action.team];
    default:
      return state;
  }
}

export function useStoreTeams() {
  return useSelector((state: AppState) => state.teams);
}

export default teams;
