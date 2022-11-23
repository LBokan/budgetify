import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton } from '@mui/material';
import { teal } from '@mui/material/colors';

import { UserInfo } from './UserInfo';

export const UserPanel = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <IconButton sx={{ mr: '5px', color: teal[800] }}>
        <SettingsIcon />
      </IconButton>

      <IconButton sx={{ mr: '20px', color: teal[800] }}>
        <NotificationsIcon />
      </IconButton>

      <UserInfo />
    </Box>
  );
};
