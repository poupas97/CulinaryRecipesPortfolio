import axios from 'axios';

import { getToken } from '../tools';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', }
});

export const ApiGet = async url => {
  const token = getToken();
  instance.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
  const result = await instance.get(url);
  return result ? result.data : null;
};

export default instance;
