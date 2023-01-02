import React from 'react';
import { Notifications } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

import { UserInfo } from './UserInfo';

export const UserPanel = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <IconButton sx={{ mr: '30px' }} aria-label="Notifications button">
        <Notifications />
      </IconButton>

      <UserInfo />
    </Stack>
  );
};
