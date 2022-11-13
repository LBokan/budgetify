import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const Test2 = () => {
  return (
    <Link to="/">
      <Button variant="outlined">TO PAGE 1</Button>
    </Link>
  );
};
