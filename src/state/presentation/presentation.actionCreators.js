// @flow
import { push } from 'connected-react-router';
import qs from 'qs';
import * as actionTypes from './presentation.actionTypes';
import type { Image } from '../../models/Image';


export function startPresentation(images: Image[], search: string) {
  return (dispatch: Function) => {
    dispatch(push(`/presentation?${qs.stringify({ search })}`));
    dispatch({
      type: actionTypes.START_PRESENTATION,
      images,
    });
  };
}

export function synchronizedSearch(search: string) {
  return (dispatch: Function) => {
    dispatch({
      type: actionTypes.SYNCHRONIZED_SEARCH,
      search,
    });
  };
}
