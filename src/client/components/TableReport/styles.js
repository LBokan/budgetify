import { yellow } from '@mui/material/colors';

export const setTableHeaderStyles = (mode) => {
  switch (mode) {
    case 'light':
      return {
        fontWeight: 700,
        backgroundColor: yellow[700]
      };

    case 'dark':
      return {
        fontWeight: 700,
        backgroundColor: yellow[900]
      };

    default:
      return {
        fontWeight: 700,
        backgroundColor: '#fff'
      };
  }
};
