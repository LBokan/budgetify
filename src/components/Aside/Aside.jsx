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

import { ThemeButton } from '../ThemeButton';

export const Aside = () => {
  const [openAside, setOpenAside] = React.useState(false);
  const [modeTheme, setModeTheme] = React.useState('');

  const handleDrawer = () => {
    setOpenAside(!openAside);
  };

  return (
    <Drawer variant="permanent" open={openAside}>
      <IconButton onClick={handleDrawer} aria-label="Toggle menu button">
        {openAside ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
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
                display: openAside ? 'inline' : 'none',
                ml: '5px'
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
          <ThemeButton isListItemButton setModeTheme={setModeTheme}>
            <ListItemText
              primary={modeTheme === 'light' ? 'Dark mode' : 'Light mode'}
              sx={{
                display: openAside ? 'inline' : 'none',
                ml: '5px'
              }}
            />
          </ThemeButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
