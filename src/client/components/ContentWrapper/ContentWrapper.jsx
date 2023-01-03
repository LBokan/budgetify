import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { setBgColor, setBoxShadowColor } from './styles';

export const ContentWrapper = ({ children, type = 'div', isPublicPage }) => {
  const { themeMode } = useThemeMode();

  type = type.toLocaleLowerCase();

  const properties = {
    position: 'relative',
    display: 'flex',
    flexDirection: isPublicPage ? 'column' : 'row',
    alignItems: type === 'header' || isPublicPage ? 'center' : 'flex-start',
    justifyContent:
      type === 'header'
        ? 'space-between'
        : isPublicPage
        ? 'center'
        : 'flex-end',
    width: '100%',
    backgroundColor: setBgColor(themeMode, type)
  };

  const setProperties = () => {
    switch (type) {
      case 'main':
      case 'div':
        properties.flexGrow = '1';
        return properties;

      case 'header':
        properties.zIndex = '9';
        properties.px = '25px';
        properties.minHeight = '70px';
        properties.boxShadow = `0 0 10px ${setBoxShadowColor(themeMode)}`;
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
  isPublicPage: PropTypes.bool
};
