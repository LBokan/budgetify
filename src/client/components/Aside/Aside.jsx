import React from 'react';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Settings
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { useAutoLogout, useThemeMode } from '@/hooks';

import { SettingsModal } from '../SettingsModal';
import { ThemeButton } from '../ThemeButton';

export const Aside = () => {
  const [isOpenAside, setIsOpenAside] = React.useState(false);
  const [isOpenSettingsModal, setIsOpenSettingsModal] = React.useState(false);

  const { themeMode } = useThemeMode();

  const autoLogout = useAutoLogout();

  const handleDrawer = () => {
    setIsOpenAside(!isOpenAside);
  };

  const openSettingsModal = () => {
    setIsOpenSettingsModal(true);
  };

  const closeSettingsModal = () => {
    setIsOpenSettingsModal(false);
  };

  return (
    <>
      {autoLogout}

      <Drawer variant="permanent" open={isOpenAside}>
        <IconButton onClick={handleDrawer} aria-label="Toggle menu button">
          {isOpenAside ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>

        <List>
          <Divider />
          <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
            <ListItemButton
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                p: '5px 8px',
                minWidth: '0',
                maxHeight: '45px'
              }}
              onClick={openSettingsModal}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: '0'
                }}
                aria-label="Settings button"
              >
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
            <ThemeButton isListItemButton>
              <ListItemText
                primary={themeMode === 'light' ? 'Dark mode' : 'Light mode'}
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ThemeButton>
          </ListItem>
        </List>
      </Drawer>

      <SettingsModal
        isOpen={isOpenSettingsModal}
        onClose={closeSettingsModal}
      />
    </>
  );
};
