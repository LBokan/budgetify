import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';

import userImage from '../../assets/img/cat.jpg';

export const UserInfo = () => {
  const { data } = {
    data: {
      imageSrc: userImage,
      fullName: 'Ivan Ivanov',
      position: 'Software Engineer'
    },
    loading: false,
    error: false
  };
  const { imageSrc, fullName, position } = data;

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
        alt="Profile image"
        src={imageSrc}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h3">{fullName}</Typography>
        <Typography variant="subtitle1" sx={{ mt: '3px' }}>
          {position}
        </Typography>
      </Box>
    </Box>
  );
};
