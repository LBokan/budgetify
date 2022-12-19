import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwtDecode from 'jwt-decode';

import { LOCAL_STORAGE_API_KEY } from './constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const apolloLink = authLink.concat(httpLink);

export const handleLogin = (token) => {
  localStorage.setItem(LOCAL_STORAGE_API_KEY, token);

  return window.location.replace('/');
};

export const isTokenValid = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_API_KEY);

  if (!token) return false;

  const tokenUserData = jwtDecode(token);

  return tokenUserData.exp < new Date().getTime();
};

export const handleLogout = () => {
  localStorage.removeItem(LOCAL_STORAGE_API_KEY);

  return window.location.replace('/login');
};
