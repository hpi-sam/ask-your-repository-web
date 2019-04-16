import api from './api';

function axiosAuthMiddleware() {
  return ({ getState }) => next => (action) => {
    const csrfToken = action.csrfToken || getState().auth.csrfToken;

    if (csrfToken) {
      api.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    } else {
      delete api.defaults.headers.common['X-CSRF-Token'];
    }

    return next(action);
  };
}

export default axiosAuthMiddleware;
