// @flow
import type { Store } from 'redux';
import type { Action } from '../state/Action';
import type { AppState } from '../state/AppState';
import api from './api';

function configureUnauthenticatedInterceptor(store: Store<AppState, Action>) {
  api.interceptors.response.use(
    response => response,
    (error) => {
      const { response } = error;

      if (response && response.status === 401) {
        store.dispatch({ type: 'RESET' });
      }

      return Promise.reject(error);
    },
  );
}

function configureAxios(store: Store<AppState, Action>) {
  configureUnauthenticatedInterceptor(store);
}

export default configureAxios;
