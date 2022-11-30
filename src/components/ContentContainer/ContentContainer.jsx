import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export const ContentContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: '20px 50px 20px 120px',
        width: '90%'
      }}
    >
      {children}
    </Box>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};
