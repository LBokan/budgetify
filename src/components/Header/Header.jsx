import React from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';

import { RouterLink } from '../RouterLink';

import { Navbar } from './Navbar';
import { UserPanel } from './UserPanel';

export const Header = () => {
  const linkStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '25px',
        height: '100%',
        boxShadow: `0 0 10px ${grey[300]}`
      }}
    >
      <RouterLink linkPath="/" stylesObj={linkStyles}>
        <RoomPreferences
          sx={{ mr: '3px', width: '30px', height: '30px', color: teal[800] }}
          aria-label="SmartHome logo"
        />
        <Typography variant="h1" sx={{ fontSize: '26px' }}>
          SmartHome
        </Typography>
      </RouterLink>

      <Navbar />

      <UserPanel />
    </Box>
  );
};
