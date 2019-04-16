// @flow
import qs from 'qs';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  withCredentials: true,
});

export default api;
