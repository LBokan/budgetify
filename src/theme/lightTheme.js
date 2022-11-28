import { createTheme } from '@mui/material';
import { green, grey, teal, yellow } from '@mui/material/colors';

import '../assets/styles/fonts/fonts.css';

const MuiAvatar = {
  styleOverrides: {
    root: {
      backgroundColor: yellow[700]
    }
  }
};

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '10px',
      color: teal[800],
      backgroundColor: green['A400'],
      boxShadow: `0 4px 4px ${grey[500]}`
    }
  }
};

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: teal[800],
      '&:hover': {
        color: yellow[700]
      }
    }
  }
};

const MuiListItemButton = {
  styleOverrides: {
    root: {
      borderRadius: '50px',
      '&:hover *': {
        color: yellow[700]
      }
    }
  }
};

const MuiIcon = {
  styleOverrides: {
    root: {
      width: '30px',
      height: '30px',
      color: teal[800]
    }
  }
};

const MuiListItemIcon = {
  styleOverrides: {
    root: {
      color: teal[800]
    }
  }
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      padding: '8px 18px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[50],
      backgroundColor: teal[800]
    }
  }
};

const MuiInputLabel = {
  styleOverrides: {
    root: {
      padding: '0 8px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[50],
      backgroundColor: teal[800]
    }
  }
};

const MuiFormHelperText = {
  styleOverrides: {
    root: {
      fontSize: '10px'
    }
  }
};

const MuiLink = {
  styleOverrides: {
    root: {
      fontSize: '14px',
      color: teal[800],
      '&:hover': {
        color: yellow[700]
      }
    }
  }
};

const MuiDrawer = {
  styleOverrides: {
    paper: {
      zIndex: '1',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '95px 15px 25px',
      minWidth: '70px'
    }
  }
};

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      light: yellow[300],
      dark: yellow[700]
    }
  },
  typography: {
    fontFamily: "'LexendDeca', sans-serif",
    h1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '700',
      lineHeight: '1',
      color: teal[800]
    },
    h2: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1',
      color: teal[800]
    },
    h3: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '1',
      color: teal[800]
    },
    subtitle1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '300',
      fontSize: '12px',
      lineHeight: '1',
      color: grey[600]
    },
    body1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: teal[800]
    },
    body2: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: teal[800]
    },
    button: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: teal[800],
      textTransform: 'none'
    }
  },
  components: {
    MuiAvatar,
    MuiButton,
    MuiIconButton,
    MuiListItemButton,
    MuiIcon,
    MuiListItemIcon,
    MuiInputBase,
    MuiInputLabel,
    MuiFormHelperText,
    MuiLink,
    MuiDrawer
  }
});
