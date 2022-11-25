import React from 'react';
import { Box } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { useColorScheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const ContentWrapper = ({ children, type = 'div', isLoginPage }) => {
  const { mode } = useColorScheme();

  type = type.toLocaleLowerCase();

  const setBgColor = (mode) => {
    switch (mode) {
      case 'light':
        return `${type === 'header' ? grey[50] : grey[300]}`;

      case 'dark':
        return `${type === 'header' ? blueGrey[900] : blueGrey[800]}`;

      default:
        return '#fff';
    }
  };

  const setBoxShadowColor = (mode) => {
    switch (mode) {
      case 'light':
        return `${grey[300]}`;

      case 'dark':
        return `${blueGrey[800]}`;

      default:
        return '#fff';
    }
  };

  const properties = {
    position: 'relative',
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
    backgroundColor: setBgColor(mode)
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
        properties.boxShadow = `0 0 10px ${setBoxShadowColor(mode)}`;
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
