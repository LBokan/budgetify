import React from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Icon, Typography } from '@mui/material';

import { RouterLink } from '../RouterLink';

import { Navbar } from './Navbar';
import { UserPanel } from './UserPanel';

export const Header = () => {
  const linkStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <>
      <RouterLink linkPath="/" stylesObj={linkStyles}>
        <Icon sx={{ mr: '3px' }} aria-label="SmartHome logo">
          <RoomPreferences sx={{ width: '100%', height: '100%' }} />
        </Icon>
        <Typography variant="h1" sx={{ fontSize: '26px' }}>
          SmartHome
        </Typography>
      </RouterLink>

      <Navbar />

      <UserPanel />
    </>
  );
};
