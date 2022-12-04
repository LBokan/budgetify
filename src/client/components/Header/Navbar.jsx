import React from 'react';
import { Breadcrumbs } from '@mui/material';

import { RouterLink } from '../RouterLink';

export const Navbar = () => {
  const linkStyles = {
    margin: '0 15px 0 0'
  };

  return (
    <Breadcrumbs separator="" aria-label="Breadcrumb">
      <RouterLink linkPath="devices" stylesObj={linkStyles}>
        Devices
      </RouterLink>
      <RouterLink linkPath="logs">Logs</RouterLink>
    </Breadcrumbs>
  );
};
