import React from 'react';
import { useMutation } from '@apollo/client';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

import { REGISTRATION } from '@/api/mutation/user';
import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import {
  ContentWrapper,
  LoginForm,
  NotificationBar,
  RegistrationModal,
  ThemeButton
} from '@/components';
import { useThemeMode } from '@/hooks';

export const Login = () => {
  const [isOpenRegistrationModal, setIsOpenRegistrationModal] =
    React.useState(false);
  const [isOpenRegistrationError, setIsOpenRegistrationError] =
    React.useState(false);
  const [isOpenRegistrationSuccess, setIsOpenRegistrationSuccess] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const [registration, { error: errorRegistration }] =
    useMutation(REGISTRATION);

  const setBorderColor = (mode) => {
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
    border: `2px solid ${setBorderColor(themeMode)}`
  };

  const openRegistrationModal = () => {
    setIsOpenRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setIsOpenRegistrationModal(false);
  };

  const registerOnSubmit = (data) => {
    registration({
      variables: {
        email: data.email,
        password: data.password
      },
      onCompleted: () => {
        setIsOpenRegistrationSuccess(true);
      },
      onError: () => {
        setIsOpenRegistrationError(true);
      }
    });
    closeRegistrationModal();
  };

  return (
    <>
      <ContentWrapper type="main" isLoginPage>
        <Stack
          direction="row"
          sx={{
            position: 'relative'
          }}
        >
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
        </Stack>
        <Typography variant="h3" sx={{ mt: '40px', mb: '35px' }}>
          Sign in and start managing your house!
        </Typography>

        <LoginForm />

        <Stack
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: '1',
            mt: '30px',
            p: '20px 50px',
            maxWidth: '400px',
            width: '100%',
            borderTop: `1px solid ${setBorderColor(themeMode)}`
          }}
        >
          <Typography variant="h3">Don&apos;t have an account?</Typography>

          <Button
            sx={{ mt: '10px', height: '40px' }}
            variant="outlined"
            fullWidth
            onClick={openRegistrationModal}
          >
            Create a new user
          </Button>
        </Stack>

        <Box
          component="img"
          sx={{
            position: 'absolute',
            bottom: '0',
            minWidth: '100%',
            maxHeight: '111px'
          }}
          alt="Waves image"
          src={
            themeMode === 'light' ? loginWavesLightImage : loginWavesDarkImage
          }
        />
      </ContentWrapper>

      {!!isOpenRegistrationError && (
        <NotificationBar
          text={errorRegistration.message}
          typeOfBar="error"
          setIsClose={setIsOpenRegistrationError}
        />
      )}

      {!!isOpenRegistrationSuccess && (
        <NotificationBar
          text={'User was created successfully'}
          typeOfBar="success"
          setIsClose={setIsOpenRegistrationSuccess}
        />
      )}

      <RegistrationModal
        isOpen={isOpenRegistrationModal}
        onClose={closeRegistrationModal}
        onSubmit={registerOnSubmit}
      />
    </>
  );
};
