import React from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const ThemeButton = ({
  children,
  isListItemButton = false,
  setModeTheme = null,
  stylesObj = {}
}) => {
  const { mode, setMode } = useColorScheme();

  const handleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      isListItemButton && setModeTheme('dark');
    } else {
      setMode('light');
      isListItemButton && setModeTheme('light');
    }
  };

  return (
    <>
      {isListItemButton ? (
        <ListItemButton
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            p: '5px 8px',
            minWidth: '0',
            maxHeight: '45px',
            ...stylesObj
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: '0'
            }}
            onClick={handleMode}
            aria-label="Theme toggle button"
          >
            {mode === 'light' ? <DarkMode /> : <LightMode />}
            {children}
          </ListItemIcon>
        </ListItemButton>
      ) : (
        <IconButton
          sx={stylesObj}
          onClick={handleMode}
          aria-label="Theme toggle button"
        >
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      )}
    </>
  );
};

ThemeButton.propTypes = {
  children: PropTypes.node.isRequired,
  isListItemButton: PropTypes.bool,
  setModeTheme: PropTypes.func,
  stylesObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
