// @flow
import { combineReducers } from 'redux';
import type { CombinedReducer } from 'redux';
import type { AppState } from './AppState';
import type { Action } from './Action';
import image from './image/image.reducer';

const rootReducer: CombinedReducer<AppState, Action> = combineReducers({
  image,
});

export default rootReducer;
