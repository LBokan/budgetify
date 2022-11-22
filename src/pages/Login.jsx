import React from 'react';
import { Box, Typography } from '@mui/material';

import { ContentContainer, ContentWrapper, LoginForm } from '@/components';

import imgWaves from '../assets/img/login-waves.png';

export const Login = () => {
  return (
    <ContentWrapper type="main">
      <ContentContainer isLoginPage>
        <Typography variant="h1" sx={{ display: 'none' }}>
          SmartHome
        </Typography>
        <Typography variant="h2" sx={{ fontSize: '64px', fontWeight: '400' }}>
          Sign in
        </Typography>
        <Typography sx={{ mt: '40px', mb: '35px', fontSize: '16px' }}>
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
