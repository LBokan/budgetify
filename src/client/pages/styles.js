import { blueGrey, grey, teal } from '@mui/material/colors';

export const setBorderColor = (mode) => {
  switch (mode) {
    case 'light':
      return `${teal[800]}`;

    case 'dark':
      return `${teal[100]}`;

    default:
      return '#fff';
  }
};

export const setBgColor = (mode) => {
  switch (mode) {
    case 'light':
      return grey[50];

    case 'dark':
      return blueGrey[900];

    default:
      return '#fff';
  }
};

export const setGridXChartColor = (mode) => {
  switch (mode) {
    case 'light':
      return teal[900];

    case 'dark':
      return grey[50];

    default:
      return '#fff';
  }
};

export const setChartDoughnutBorderColor = (mode) => {
  switch (mode) {
    case 'light':
      return grey[200];

    case 'dark':
      return blueGrey[700];

    default:
      return '#fff';
  }
};
