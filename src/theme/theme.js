import { green, grey, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import '../assets/styles/fonts/fonts.css';

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '10px',
      color: teal[800],
      backgroundColor: green['A400'],
      boxShadow: `0 4px 4px ${grey[500]}`
    }
  }
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      padding: '8px 18px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[50],
      backgroundColor: teal[800]
    }
  }
};

const MuiInputLabel = {
  styleOverrides: {
    root: {
      padding: '0 8px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[50],
      backgroundColor: teal[800]
    }
  }
};

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
