import React from 'react';
import { Close } from '@mui/icons-material';
import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

import { setBgColor, setBorder, setTextStyles } from './styles';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = '',
  text,
  variant = 'contained'
}) => {
  const { themeMode } = useThemeMode();

  return (
    <Modal open={isOpen}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: '50px 40px',
          maxWidth: '350px',
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

        {!!title && (
          <Typography variant="h2" sx={{ fontSize: '18px' }}>
            {title}
          </Typography>
        )}

        <Typography variant="h3" sx={setTextStyles(title)}>
          {text}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" sx={{ mt: '25px' }}>
          <Button variant={variant} sx={{ height: '40px' }} onClick={onSubmit}>
            Yes
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: '30px', height: '40px' }}
            onClick={onClose}
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string
};
