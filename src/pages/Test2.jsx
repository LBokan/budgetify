import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAnimalsListQuery } from '../store/mytest/mytest.api';

export const Test2 = () => {
  const { isError, data: postsData } = useAnimalsListQuery({
    refetchOnFocus: true
  });

  return (
    <>
      <Link to="/">
        <Button variant="outlined">TO PAGE 1</Button>
      </Link>
      <div>{isError && <p>DATA ERROR</p>}</div>

      <div>
        {!!postsData &&
          postsData.map((animal) => (
            <img key={animal.id} src={animal.thumbnailUrl} />
          ))}
      </div>
    </>
  );
};
