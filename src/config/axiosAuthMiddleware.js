import axios from 'axios';

function axiosAuthMiddleware() {
  return ({ getState }) => next => (action) => {
    const { token } = getState().auth;

    if (token) {
      axios.defaults.headers.common['X-CSRF-Token'] = token;
    } else {
      delete axios.defaults.headers.common['X-CSRF-Token'];
    }

    return next(action);
  };
}

export default axiosAuthMiddleware;
