import { blueGrey, green, grey, red, teal } from '@mui/material/colors';

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

export const setTextActiveColor = (mode, title) => {
  if (title.toLowerCase().includes('inactive')) {
    return `${red[900]}`;
  } else if (title.toLowerCase().includes('active')) {
    return `${green[700]}`;
  }

  switch (mode) {
    case 'light':
      return `${teal[800]}`;

    case 'dark':
      return `${grey[50]}`;

    default:
      return '#fff';
  }
};
