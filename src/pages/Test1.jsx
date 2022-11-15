import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import imgCat from '../assets/img/cat.jpg';

export const Test1 = () => {
  return (
    <Link to="test2">
      <Button variant="contained">TO PAGE 2</Button>
      <div className="test"></div>
      <img src={imgCat} />
    </Link>
  );
};
