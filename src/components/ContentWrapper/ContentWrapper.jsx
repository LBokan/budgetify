import React from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import PropTypes from 'prop-types';

export const ContentWrapper = ({ children, type = 'div', isLoginPage }) => {
  type = type.toLocaleLowerCase();

  const properties = {
    position: type === 'header' ? 'relative' : 'relative',
    display: 'flex',
    flexDirection: isLoginPage ? 'column' : 'row',
    alignItems: type === 'header' || isLoginPage ? 'center' : 'flex-start',
    justifyContent:
      type === 'header'
        ? 'space-between'
        : isLoginPage
        ? 'center'
        : 'flex-start',
    width: '100%',
    backgroundColor: type === 'header' ? grey[50] : grey[300]
  };

  const setProperties = () => {
    switch (type) {
      case 'main':
      case 'div':
        properties.flexGrow = '1';
        properties.height = '100%';
        return properties;

      case 'header':
        properties.zIndex = '9';
        properties.px = '25px';
        properties.minHeight = '70px';
        properties.boxShadow = `0 0 10px ${grey[300]}`;
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

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isLoginPage: PropTypes.bool
};
