import { blueGrey, grey } from '@mui/material/colors';

export const setBgColor = (mode, type) => {
  switch (mode) {
    case 'light':
      return `${type === 'header' ? grey[50] : grey[300]}`;

    case 'dark':
      return `${type === 'header' ? blueGrey[900] : blueGrey[800]}`;

    default:
      return '#fff';
  }
};

export const setBoxShadowColor = (mode) => {
  switch (mode) {
    case 'light':
      return `${grey[300]}`;

    case 'dark':
      return `${blueGrey[800]}`;

    default:
      return '#fff';
  }
};
