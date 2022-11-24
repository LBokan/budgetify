import React from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';

export const ContentContainer = ({ children, isLoginPage = false }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLoginPage ? 'center' : 'flex-start',
        justifyContent: isLoginPage ? 'center' : 'flex-start',
        p: 0,
        maxWidth: '1200px',
        height: '100%'
      }}
    >
      {children}
    </Container>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isLoginPage: PropTypes.bool
};
