import { yellow } from '@mui/material/colors';

export const setContainerWidth = (isShortView) => {
  switch (isShortView) {
    case true:
      return '900px';

    case false:
    default:
      return '100%';
  }
};

export const setDirectionValue = (isShortView) => {
  switch (isShortView) {
    case true:
      return 'row';

    case false:
    default:
      return 'column';
  }
};

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
