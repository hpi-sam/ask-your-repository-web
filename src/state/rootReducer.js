// @flow
import { combineReducers } from 'redux';
import type { CombinedReducer } from 'redux';
import type { AppState } from './AppState';
import type { Action } from './Action';
import { reducer as flashReducer } from 'redux-flash';
import image from './image/image.reducer';
import images from './images/images.reducer';

const rootReducer: CombinedReducer<AppState, Action> = combineReducers({
  image,
  images,
  flash: flashReducer,
});

export default rootReducer;
