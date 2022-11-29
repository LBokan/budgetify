import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import _ from 'lodash';

import imgCat from '../assets/img/fromServer/cat.jpg';
import { TestComp } from '../components/TestComp';

import { Test2 } from './Test2';

const arr = [1, 2, 3];
const newArr = _.fill(arr, 'b');

export const Test1 = () => {
  return (
    <>
      <Link to="test2">
        <Button variant="contained">TO PAGE 2</Button>
      </Link>
      <div>{newArr}</div>
      <div className="test"></div>
      <TestComp
        strOrNumVal="Hello"
        numVal={10}
        stateTest="Loading"
        rendarable="something"
        comp={<Test2 />}
      />
      <img src={imgCat} />
    </>
  );
};
