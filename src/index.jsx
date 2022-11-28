import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import { useThemeMode } from '@/hooks';

import { store } from './store';
import { darkTheme, lightTheme } from './theme';

import './assets/styles/index.css';

const Root = () => {
  const App = React.lazy(() => import('./pages/App'));

  const { themeMode } = useThemeMode();

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
