// @flow
import { combineReducers } from 'redux';
import image from './image/image.reducer';

const rootReducer = combineReducers({
  image,
});

export default rootReducer;
