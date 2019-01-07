// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';
import type { CombinedReducer } from 'redux';
import { reducer as flashReducer } from 'redux-flash';
import type { AppState } from './AppState';
import type { Action } from './Action';
import image from './image/image.reducer';
import presentation from './presentation/presentation.reducer';
import activeTeam from './active_team/activeTeam.reducer';
import teamSidebar from './team_sidebar/teamSidebar.reducer';

function createRootReducer(history: History): CombinedReducer<AppState, Action> {
  return combineReducers({
    router: connectRouter(history),
    image,
    presentation,
    activeTeam,
    teamSidebar,
    flash: flashReducer,
  });
}

export default createRootReducer;
