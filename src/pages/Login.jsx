import React from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

import { ContentContainer, ContentWrapper, LoginForm } from '@/components';

import imgWaves from '../assets/img/login-waves.png';

export const Login = () => {
  return (
    <ContentWrapper type="main">
      <ContentContainer isLoginPage>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RoomPreferences
            sx={{ mr: '5px', width: '45px', height: '45px', color: teal[800] }}
            aria-label="SmartHome logo"
          />
          <Typography variant="h1" sx={{ fontSize: '46px' }}>
            SmartHome
          </Typography>
        </Box>
        <Typography sx={{ mt: '40px', mb: '35px' }}>
          Sign in and start managing your house!
        </Typography>

        <LoginForm />
      </ContentContainer>

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
