import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import _ from 'lodash';

import imgCat from '../assets/img/cat.jpg';

const arr = [1, 2, 3];
const newArr = _.fill(arr, 'b');

export const Test1 = () => {
  return (
    <Link to="test2">
      <Button variant="contained">TO PAGE 2</Button>
      <div>{newArr}</div>
      <div className="test"></div>
      <img src={imgCat} />
    </Link>
  );
};
