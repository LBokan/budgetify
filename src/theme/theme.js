import { teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import { MuiButton, MuiInputBase, MuiInputLabel } from './components';

import '../assets/styles/fonts/fonts.css';

export const lightTheme = createTheme({
  typography: {
    fontFamily: "'LexendDeca', sans-serif",
    h1: {
      fontFamily: "'LexendDeca', sans-serif",
      color: teal[800]
    },
    h2: {
      fontFamily: "'LexendDeca', sans-serif",
      lineHeight: '80px',
      color: teal[800]
    },
    body1: {
      fontFamily: "'LexendDeca', sans-serif",
      color: teal[800]
    },
    body2: {
      fontFamily: "'LexendDeca', sans-serif",
      color: teal[800]
    },
    button: {
      fontFamily: "'LexendDeca', sans-serif",
      color: teal[800],
      textTransform: 'none'
    }
  },
  components: {
    MuiButton,
    MuiInputBase,
    MuiInputLabel
  }
});
