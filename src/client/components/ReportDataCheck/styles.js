import { blueGrey, grey } from '@mui/material/colors';

export const setBgColor = (mode) => {
  switch (mode) {
    case 'light':
      return `${grey[100]}`;

    case 'dark':
      return `${blueGrey[900]}`;

    default:
      return '#fff';
  }
};
