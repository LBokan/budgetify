import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { Layout } from '@/components/Layout';
import { useThemeMode } from '@/hooks';

import { darkTheme, lightTheme } from '../theme';

import { Devices } from './Devices';
import { Landing } from './Landing';
import { Login } from './Login';
import { Logs } from './Logs';
import { Test2 } from './Test2';

const App = () => {
  const { themeMode } = useThemeMode();

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
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
    </ThemeProvider>
  );
};

export default App;
