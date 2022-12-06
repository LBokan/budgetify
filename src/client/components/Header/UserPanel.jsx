import React from 'react';
import { Notifications } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { UserInfo } from './UserInfo';

export const UserPanel = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <IconButton sx={{ mr: '30px' }} aria-label="Notifications button">
        <Notifications />
      </IconButton>

      <UserInfo />
    </Box>
  );
};
