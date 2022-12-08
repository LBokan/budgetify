import React from 'react';
import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

export const NotificationBar = ({ text, typeOfBar = 'info' }) => {
  const [isOpenBar, setIsOpenBar] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenBar(false);
  };

  const actionElement = (
    <IconButton
      size="small"
      color="inherit"
      onClick={handleClose}
      aria-label="Close bar"
    >
      <Close />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isOpenBar}
      autoHideDuration={6000}
      onClose={handleClose}
      action={actionElement}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={typeOfBar}
        onClose={handleClose}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

NotificationBar.propTypes = {
  text: PropTypes.string.isRequired,
  typeOfBar: PropTypes.string
};
