import { blueGrey, grey } from '@mui/material/colors';

export const setBgColor = (mode) => {
  switch (mode) {
    case 'light':
      return grey[200];

    case 'dark':
      return blueGrey[700];

    default:
      return '#fff';
  }
};

export const setBorder = (mode) => {
  switch (mode) {
    case 'light':
      return `1px solid ${grey[400]}`;

    case 'dark':
      return `1px solid ${blueGrey[900]}`;

    default:
      return '1px solid #000';
  }
};
