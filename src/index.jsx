import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { store } from './store/store';
import { theme } from './theme';

import './assets/styles/index.css';

const App = React.lazy(() => import('./pages/App'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </Provider>
    </CssVarsProvider>
  </React.StrictMode>
);
