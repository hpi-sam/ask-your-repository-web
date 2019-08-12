// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';
import type { CombinedReducer } from 'redux';
import { reducer as flashReducer } from 'redux-flash';
import type { AppState } from './AppState';
import type { Action } from './Action';
import presentation from './presentation/presentation.reducer';
import activeTeam from './active_team/activeTeam.reducer';
import teamSidebar from './team_sidebar/teamSidebar.reducer';
import teams from './teams/teams.reducer';
import presentationMode from './presentation_mode/presentationMode.reducer';
import auth from './auth/auth.reducer';

function createRootReducer(history: History): CombinedReducer<AppState, Action> {
  return (state, action) => {
    const combinedReducer = combineReducers({
      router: connectRouter(history),
      presentation,
      activeTeam,
      teamSidebar,
      presentationMode,
      auth,
      teams,
      flash: flashReducer,
    });

    const nextState = action.type === 'RESET'
      ? undefined
      : state;

    return combinedReducer(nextState, action);
  };
}

export default createRootReducer;
