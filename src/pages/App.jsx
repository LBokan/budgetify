import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@/components/Layout';

import { Devices } from './Devices';
import { Landing } from './Landing';
import { Login } from './Login';
import { Logs } from './Logs';
import { Test2 } from './Test2';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<Fallback />} /> */}

        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="devices" element={<Devices />} />
          <Route path="logs" element={<Logs />} />
          <Route path="test2" element={<Test2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
