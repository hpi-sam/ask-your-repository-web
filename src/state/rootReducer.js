// @flow
import { combineReducers } from 'redux';
import type { CombinedReducer } from 'redux';
import { reducer as flashReducer } from 'redux-flash';
import type { AppState } from './AppState';
import type { Action } from './Action';
import image from './image/image.reducer';

const rootReducer: CombinedReducer<AppState, Action> = combineReducers({
  image,
  flash: flashReducer,
});

export default rootReducer;
