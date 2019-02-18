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
import presentationMode from './presentation_mode/presentationMode.reducer';
import auth from './auth/auth.reducer';

function createRootReducer(history: History): CombinedReducer<AppState, Action> {
  return combineReducers({
    router: connectRouter(history),
    presentation,
    activeTeam,
    teamSidebar,
    presentationMode,
    auth,
    flash: flashReducer,
  });
}

export default createRootReducer;
