import React from 'react';
import { Notifications, Settings } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { teal } from '@mui/material/colors';

import { UserInfo } from './UserInfo';

export const UserPanel = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <IconButton sx={{ mr: '5px', color: teal[800] }}>
        <Settings />
      </IconButton>

      <IconButton sx={{ mr: '20px', color: teal[800] }}>
        <Notifications />
      </IconButton>

      <UserInfo />
    </Box>
  );
};
