import { grey } from '@mui/material/colors';

export const setIconColor = (mode) => {
  switch (mode) {
    case 'light':
      return `${grey[50]}`;

    case 'dark':
      return `${grey[300]}`;

    default:
      return '#fff';
  }
};
