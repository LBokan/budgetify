import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Test1 } from './Test1';
import { Test2 } from './Test2';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  );
};
