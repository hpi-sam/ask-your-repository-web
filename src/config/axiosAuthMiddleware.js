import axios from 'axios';

function axiosAuthMiddleware() {
  return ({ getState }) => next => (action) => {
    const { csrfToken } = getState().auth;

    if (csrfToken) {
      axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
    } else {
      delete axios.defaults.headers.common['X-CSRF-Token'];
    }

    return next(action);
  };
}

export default axiosAuthMiddleware;
