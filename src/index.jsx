import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import { store } from './store/store';
import { lightTheme } from './theme';

import './assets/styles/index.css';

const App = React.lazy(() => import('./pages/App'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
