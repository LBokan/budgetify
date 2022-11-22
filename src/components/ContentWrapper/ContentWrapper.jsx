import React from 'react';
import { Box } from '@mui/material';

export const ContentWrapper = ({ children, type = 'div' }) => {
  const properties = {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  };

  const setProperties = () => {
    switch (type) {
      case 'main':
      case 'div':
        properties.flexGrow = '1';
        properties.height = '100%';
        return properties;

      default:
        return properties;
    }
  };

  return (
    <Box component={type} sx={setProperties}>
      {children}
    </Box>
  );
};
