// @flow
import { push } from 'connected-react-router';
import * as actionTypes from './presentation.actionTypes';
import type { Image } from '../../models/Image';

export function startPresentation(images: Image[]) {
  return (dispatch: Function) => {
    dispatch(push('/presentation'));
    dispatch({
      type: actionTypes.START_PRESENTATION,
      images,
    });
  };
}

export default startPresentation;
