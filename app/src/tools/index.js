import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

const TOKEN_KEY = 'TOKEN_KEY';

export const getToken = () => {
  const result = window.sessionStorage.getItem(TOKEN_KEY);
  return result ? JSON.parse(result) : null;
};

export const getDecodedToken = () => {
  const result = getToken();
  return result ? jwtDecode(result.accessToken) : null;
};

export const setToken = (data) =>
  window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));

export const removeToken = () => window.sessionStorage.removeItem(TOKEN_KEY);

export const getValue = (value, data) => {
  if (Array.isArray(value)) {
    const result = value.map((it) => get(data, it, ''));
    return result.join(' ').trim();
  }

  const nextValue = get(data, value, '');
  return isIsoDate(nextValue) ? formatDate(nextValue) : nextValue;
};

export const resolveLink = (link, data) => {
  const result = String(link)
    .split('/')
    .map((it) => {
      if (it.startsWith(':')) {
        const propToSearch = it.replace(':', '');
        return get(data, propToSearch, propToSearch);
      }
      return it;
    })
    .join('/');

  return result;
};

const isIsoDate = (isoDate) =>
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(isoDate);

const formatDate = (date) => {
  const nextDate = new Date(date);
  let month = nextDate.getMonth() + 1;
  let day = nextDate.getDate();
  const year = nextDate.getFullYear();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  let hour = nextDate.getHours();
  let minute = nextDate.getMinutes();
  let second = nextDate.getSeconds();

  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;
  if (second < 10) second = `0${second}`;

  return `${[year, month, day].join('-')} ${[hour, minute, second].join(':')}`;
};

export const getOption = (it) => {
  if (!it) return null;
  return {
    value: it,
    label: it.name || it.description,
  };
};
