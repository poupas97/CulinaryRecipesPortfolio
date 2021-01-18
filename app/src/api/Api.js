import { getToken } from '../tools';
import { responseInterceptor } from './Interceptor';

const baseUrl = 'http://localhost:8000/api';

const Get = async url => {
  const token = getToken();
  const result = await fetch(baseUrl + url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json',
    }
  });
  return responseInterceptor(result);
};

const Post = async (url, body) => {
  const token = getToken();
  const result = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  return responseInterceptor(result);
};

const Put = async (url, body) => {
  const token = getToken();
  const result = await fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  return responseInterceptor(result);
};

const Delete = async url => {
  const token = getToken();
  const result = await fetch(baseUrl + url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  return responseInterceptor(result);
};

const PostNoAuth = async (url, body) => {
  const result = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return responseInterceptor(result);
};

export default { Get, Post, PostNoAuth, Put, Delete };

