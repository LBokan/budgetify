import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { handleLogout, isTokenValid } from '@/helpers/authorization';

export const PrivateRoute = ({ children }) => {
  const isTokenValidValue = isTokenValid();

  if (!isTokenValidValue) handleLogout();

  return isTokenValidValue ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};
