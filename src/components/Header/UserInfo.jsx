import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

import userImage from '../../assets/img/cat.jpg';

export const UserInfo = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Avatar
        sx={{
          mr: '10px',
          width: '40px',
          height: '40px',
          bgcolor: yellow[700]
        }}
        alt="Ivan Ivanov"
        src={userImage}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3">Ivan Ivanov</Typography>
        <Typography variant="subtitle1" sx={{ mt: '3px' }}>
          Software Engineer
        </Typography>
      </Box>
    </Box>
  );
};
