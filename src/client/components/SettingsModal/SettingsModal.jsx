import React from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Close, Logout, PersonRemove } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';

import { DELETE_USER, EDIT_USER } from '@/api/mutation/user';
import { GET_USER } from '@/api/query/user';
import { loginWavesDarkImage, loginWavesLightImage } from '@/assets/img';
import { NotificationBar } from '@/components';
import { handleLogout } from '@/helpers';
import { useThemeMode } from '@/hooks';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditUserForm } from '../EditUserForm';

import { setBgColor, setBorder } from './styles';

export const SettingsModal = ({ isOpen, onClose }) => {
  const [confirmationModal, setConfirmationModal] = React.useState({
    isOpen: false,
    text: '',
    onSubmit: () => {}
  });

  const [notificationBar, setNotificationBar] = React.useState({
    isOpen: false,
    typeOfBar: '',
    text: ''
  });

  const { themeMode } = useThemeMode();

  const client = useApolloClient();

  const {
    loading: loadingUserData,
    data: { getUser: userData } = { getUser: {} }
  } = useQuery(GET_USER, {
    onError: (error) => {
      setNotificationBar((prevState) => ({
        ...prevState,
        isOpen: true,
        typeOfBar: 'error',
        text: error.message
      }));
    }
  });

  const [editUser, { loading: loadingEditUser }] = useMutation(EDIT_USER, {
    refetchQueries: [GET_USER],
    onError: (error) => {
      setNotificationBar((prevState) => ({
        ...prevState,
        isOpen: true,
        typeOfBar: 'error',
        text: error.message
      }));
    }
  });

  const [deleteUser, { loading: loadingDeleteUser }] = useMutation(
    DELETE_USER,
    {
      onError: (error) => {
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'error',
          text: error.message
        }));
      }
    }
  );

  const resetCache = () => {
    client.resetStore();
  };

  const editUserOnSubmit = (data, setIsEditMode) => {
    editUser({
      variables: {
        name: data.name,
        surname: data.surname,
        mobileNumber: data.mobileNumber
      },
      onCompleted: () => {
        setNotificationBar((prevState) => ({
          ...prevState,
          isOpen: true,
          typeOfBar: 'success',
          text: 'Editing of the account was successful'
        }));
        resetCache();
        setIsEditMode(false);
      }
    });
  };

  const deleteUserOnSubmit = () => {
    deleteUser({
      onCompleted: () => {
        resetCache();
        closeConfirmationModal();
        handleLogout();
      }
    });
  };

  const openConfirmationModal = (typeOfModal) => {
    switch (typeOfModal.toLowerCase()) {
      case 'logout':
        setConfirmationModal((prevState) => ({
          ...prevState,
          isOpen: true,
          text: 'Do you really want to logout?',
          onSubmit: handleLogout
        }));
        break;

      case 'delete':
        setConfirmationModal((prevState) => ({
          ...prevState,
          isOpen: true,
          text: 'Do you really want to delete the account? All your data will be lost',
          onSubmit: deleteUserOnSubmit
        }));
        break;
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModal((prevState) => ({
      ...prevState,
      isOpen: false,
      text: '',
      onSubmit: () => {}
    }));
  };

  const resetNotificationBarData = (isOpen) => {
    setNotificationBar((prevState) => ({
      ...prevState,
      isOpen: isOpen,
      typeOfBar: '',
      text: ''
    }));
  };

  return (
    <>
      <Modal open={isOpen}>
        <Stack
          position="absolute"
          top="50%"
          left="50%"
          p="50px 40px"
          pb="80px"
          maxWidth="500px"
          width="100%"
          border={setBorder(themeMode)}
          borderRadius="10px"
          boxShadow={24}
          bgcolor={setBgColor(themeMode)}
          overflow="hidden"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            onClick={onClose}
            aria-label="Close create device modal"
          >
            <Close />
          </IconButton>

          <Typography variant="h2" sx={{ fontSize: '18px' }}>
            Settings
          </Typography>

          {!!userData && (
            <EditUserForm
              userData={userData}
              onSubmit={editUserOnSubmit}
              isLoadingData={loadingUserData}
              isLoadingOnEdit={loadingEditUser}
            />
          )}

          <Button
            variant="text"
            sx={{ mt: '25px', mx: 'auto', width: '350px', minHeight: '45px' }}
            startIcon={<Logout aria-label="Logout button" />}
            onClick={() => openConfirmationModal('logout')}
          >
            Logout
          </Button>

          <Button
            variant="danger"
            sx={{ mt: '35px', mx: 'auto', width: '200px', minHeight: '45px' }}
            startIcon={<PersonRemove aria-label="Delete account button" />}
            onClick={() => openConfirmationModal('delete')}
          >
            Delete account
          </Button>

          <Box
            component="img"
            sx={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              maxHeight: '40px'
            }}
            src={
              themeMode === 'light' ? loginWavesLightImage : loginWavesDarkImage
            }
            alt="Waves image"
          />
        </Stack>
      </Modal>

      {!!notificationBar.isOpen && (
        <NotificationBar
          text={notificationBar.text}
          typeOfBar={notificationBar.typeOfBar}
          setIsOpenBarOnComplete={resetNotificationBarData}
        />
      )}

      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmationModal}
        onSubmit={confirmationModal.onSubmit}
        text={confirmationModal.text}
        variant="danger"
        isLoading={loadingDeleteUser}
      />
    </>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
