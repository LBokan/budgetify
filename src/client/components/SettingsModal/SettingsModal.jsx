import React from 'react';
import { Close, Logout } from '@mui/icons-material';
import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { handleLogout } from '@/helpers/authorization';
import { useThemeMode } from '@/hooks';

import { ConfirmationModal } from '../ConfirmationModal';

import { setBgColor, setBorder } from './styles';

export const SettingsModal = ({ isOpen, onClose }) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  return (
    <>
      <Modal open={isOpen}>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            p: '50px 40px',
            maxWidth: '500px',
            width: '100%',
            border: setBorder(themeMode),
            borderRadius: '10px',
            boxShadow: 24,
            bgcolor: setBgColor(themeMode),
            overflow: 'hidden'
          }}
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

          <Typography variant="h2">Settings</Typography>

          <Button
            variant="text"
            sx={{ mt: '25px', mx: 'auto', width: '350px', minHeight: '45px' }}
            startIcon={<Logout aria-label="Logout button" />}
            onClick={openConfirmationModal}
          >
            Logout
          </Button>
        </Stack>
      </Modal>

      <ConfirmationModal
        isOpen={isOpenConfirmationModal}
        onClose={closeConfirmationModal}
        onSubmit={handleLogout}
        text="Do you really want to logout?"
        variant="danger"
      />
    </>
  );
};

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
