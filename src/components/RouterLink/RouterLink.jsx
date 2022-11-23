import React from 'react';
import { Link as LinkReact } from 'react-router-dom';
import { Link } from '@mui/material';

export const RouterLink = ({ children, linkPath, stylesObj }) => {
  return (
    <Link component={LinkReact} to={linkPath} underline="none" sx={stylesObj}>
      {children}
    </Link>
  );
};
