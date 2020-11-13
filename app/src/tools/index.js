const TOKEN_KEY = 'TOKEN_KEY';

export const getToken = () => window.sessionStorage.getItem(TOKEN_KEY);

export const setToken = data => {
  window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
