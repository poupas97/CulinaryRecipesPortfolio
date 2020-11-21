import jwtDecode from 'jwt-decode';

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
