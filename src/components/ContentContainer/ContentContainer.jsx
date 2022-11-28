import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export const ContentContainer = ({ children }) => {
  return <Box sx={{ ml: '70px' }}>{children}</Box>;
};

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};
