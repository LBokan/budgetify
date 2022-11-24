import React from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';

import { ContentWrapper, LoginForm } from '@/components';

import imgWaves from '../assets/img/login-waves.png';

export const Login = () => {
  return (
    <ContentWrapper type="main" isLoginPage>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon sx={{ mr: '5px', width: '45px', height: '45px' }}>
          <RoomPreferences
            sx={{ width: '100%', height: '100%' }}
            aria-label="SmartHome logo"
          />
        </Icon>
        <Typography variant="h1" sx={{ fontSize: '46px' }}>
          SmartHome
        </Typography>
      </Box>
      <Typography sx={{ mt: '40px', mb: '35px' }}>
        Sign in and start managing your house!
      </Typography>

      <LoginForm />

      <Box
        component="img"
        sx={{
          position: 'absolute',
          bottom: '0',
          minWidth: '100%',
          maxHeight: '111px'
        }}
        alt="Waves image"
        src={imgWaves}
      />
    </ContentWrapper>
  );
};
