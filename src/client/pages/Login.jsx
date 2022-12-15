import React from 'react';
import { useMutation } from '@apollo/client';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

import { SIGN_UP } from '@/api/mutation/user';
import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import {
  ContentWrapper,
  LoginForm,
  NotificationBar,
  SignUpModal,
  ThemeButton
} from '@/components';
import { useThemeMode } from '@/hooks';

export const Login = () => {
  const [isOpenSignUpModal, setIsOpenSignUpModal] = React.useState(false);
  const [isOpenSignUpError, setIsOpenSignUpError] = React.useState(false);
  const [isOpenSignUpSuccess, setIsOpenSignUpSuccess] = React.useState(false);

  const { themeMode } = useThemeMode();

  const [signUp, { error: errorSignUp }] = useMutation(SIGN_UP);

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

  const openSignUpModal = () => {
    setIsOpenSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setIsOpenSignUpModal(false);
  };

  const signUpOnSubmit = (data, resetForm) => {
    signUp({
      variables: {
        name: data.name,
        surname: data.surname,
        mobileNumber: data.mobileNumber || null,
        email: data.email,
        password: data.password
      },
      onCompleted: () => {
        setIsOpenSignUpSuccess(true);
        closeSignUpModal();
        resetForm();
      },
      onError: () => {
        setIsOpenSignUpError(true);
      }
    });
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
            onClick={openSignUpModal}
          >
            Sign up
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

      {!!isOpenSignUpError && (
        <NotificationBar
          text={errorSignUp.message}
          typeOfBar="error"
          setIsClose={setIsOpenSignUpError}
        />
      )}

      {!!isOpenSignUpSuccess && (
        <NotificationBar
          text={'Sign up was successful'}
          typeOfBar="success"
          setIsClose={setIsOpenSignUpSuccess}
        />
      )}

      <SignUpModal
        isOpen={isOpenSignUpModal}
        onClose={closeSignUpModal}
        onSubmit={signUpOnSubmit}
      />
    </>
  );
};
