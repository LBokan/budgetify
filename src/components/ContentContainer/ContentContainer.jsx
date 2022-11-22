import React from 'react';
import { Container } from '@mui/material';

export const ContentContainer = ({ children, isLoginPage = false }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isLoginPage ? 'center' : 'flex-start',
        justifyContent: isLoginPage ? 'center' : 'flex-start',
        padding: 0,
        maxWidth: '1200px',
        height: '100%'
      }}
    >
      {children}
    </Container>
  );
};
