import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

const TOKEN_KEY = 'TOKEN_KEY';

export const getToken = () => {
  const result = window.sessionStorage.getItem(TOKEN_KEY);
  return result ? JSON.parse(result): null;
};

export const getDecodedToken = () => {
  const result = getToken();
  return result ? jwtDecode(result.accessToken): null;
};

export const setToken = data => window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));

export const removeToken = () => window.sessionStorage.removeItem(TOKEN_KEY);

export const getValue = (value, data) => {
  if (Array.isArray(value)) {
    const result = value.map(it => get(data, it, ''));
    return result.join(' ').trim();
  }

  return get(data, value, '');
};

export const resolveLink = (link, data) => {
  const result = String(link).split('/').map(it => {
    if (it.startsWith(':')) {
      const propToSearch = it.replace(':', '');
      return get(data, propToSearch, propToSearch);
    }
    return it;
  }).join('/');

  return result;
};
