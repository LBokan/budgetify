import React from 'react';
import { useMutation } from '@apollo/client';
import { RoomPreferences } from '@mui/icons-material';
import { Box, Button, Icon, Stack, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

import { CREATE_USER } from '@/api/mutation/user';
import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import {
  ContentWrapper,
  CreateUserModal,
  LoginForm,
  NotificationBar,
  ThemeButton
} from '@/components';
import { useThemeMode } from '@/hooks';

export const Login = () => {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] =
    React.useState(false);
  const [isOpenCreateUserError, setIsOpenCreateUserError] =
    React.useState(false);
  const [isOpenCreateUserSuccess, setIsOpenCreateUserSuccess] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const [createUser, { error: errorCreateUser }] = useMutation(CREATE_USER);

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

  const openCreateUserModal = () => {
    setIsOpenCreateUserModal(true);
  };

  const closeCreateUserModal = () => {
    setIsOpenCreateUserModal(false);
  };

  const createUserOnSubmit = (data) => {
    createUser({
      variables: {
        email: data.email,
        password: data.password
      },
      onCompleted: () => {
        setIsOpenCreateUserSuccess(true);
      },
      onError: () => {
        setIsOpenCreateUserError(true);
      }
    });
    closeCreateUserModal();
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
            onClick={openCreateUserModal}
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

      {!!isOpenCreateUserError && (
        <NotificationBar
          text={errorCreateUser.message}
          typeOfBar="error"
          setIsClose={setIsOpenCreateUserError}
        />
      )}

      {!!isOpenCreateUserSuccess && (
        <NotificationBar
          text={'User was created successfully'}
          typeOfBar="success"
          setIsClose={setIsOpenCreateUserSuccess}
        />
      )}

      <CreateUserModal
        isOpen={isOpenCreateUserModal}
        onClose={closeCreateUserModal}
        onSubmit={createUserOnSubmit}
      />
    </>
  );
};
