import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const theme = extendTheme({
  colorSchemes: {
    light: {
      ...lightTheme
    },
    dark: {
      ...darkTheme
    }
  }
});
