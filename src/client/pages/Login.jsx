import React from 'react';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import { ContentWrapper, LoginForm, ThemeButton } from '@/components';
import { useThemeMode } from '@/hooks';

export const Login = () => {
  const { themeMode } = useThemeMode();

  const setIconBorderColor = (mode) => {
    switch (mode) {
      case 'light':
        return `${teal[800]}`;

      case 'dark':
        return `${teal[100]}`;

      default:
        return '#fff';
    }
  };

  const themeSwitcherStyles = {
    position: 'absolute',
    top: 'auto',
    left: '-150px',
    border: `2px solid ${setIconBorderColor(themeMode)}`
  };

  return (
    <ContentWrapper type="main" isLoginPage>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Icon sx={{ mr: '5px', width: '45px', height: '45px' }}>
          <RoomPreferences
            sx={{ width: '100%', height: '100%' }}
            aria-label="SmartHome logo"
          />
        </Icon>
        <Typography variant="h1" sx={{ fontSize: '46px' }}>
          SmartHome
        </Typography>

        <ThemeButton stylesObj={themeSwitcherStyles} />
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
        src={themeMode === 'light' ? loginWavesLightImage : loginWavesDarkImage}
      />
    </ContentWrapper>
  );
};
