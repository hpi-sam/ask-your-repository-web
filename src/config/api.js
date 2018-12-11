import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  requestInterceptor: config => ({
    ...config,
  }),
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export default api;
