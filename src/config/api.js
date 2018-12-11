import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  requestInterceptor: config => ({ ...config }),
  paramsSerializer: parameters => qs.stringify(parameters, { arrayFormat: 'repeat' }),
});

export default api;
