import { yellow } from '@mui/material/colors';

export const setBgColor = (mode) => {
  switch (mode) {
    case 'light':
      return `${yellow[700]}`;

    case 'dark':
      return `${yellow[900]}`;

    default:
      return '#fff';
  }
};

export const setBoxShadowColor = (mode) => {
  switch (mode) {
    case 'light':
      return `0 0 2px ${yellow[900]}`;

    case 'dark':
      return `0 0 2px ${yellow[800]}`;

    default:
      return '#fff';
  }
};
