import axios from 'axios';

function axiosAuthMiddleware() {
  return ({ getState }) => next => (action) => {
    const { user } = getState().auth;

    if (user) {
      axios.defaults.headers.common['X-CSRF-Token'] = user.token;
    } else {
      delete axios.defaults.headers.common['X-CSRF-Token'];
    }

    return next(action);
  };
}

export default axiosAuthMiddleware;
