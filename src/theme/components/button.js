import { green, grey, teal } from '@mui/material/colors';

export const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '10px',
      color: teal[800],
      backgroundColor: green['A400'],
      boxShadow: `0 4px 4px ${grey[500]}`
    }
  }
};
