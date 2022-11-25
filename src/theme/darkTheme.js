import { blueGrey, green, grey, yellow } from '@mui/material/colors';

import '../assets/styles/fonts/fonts.css';

const MuiAvatar = {
  styleOverrides: {
    root: {
      backgroundColor: yellow[900]
    }
  }
};

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '10px',
      color: grey[50],
      backgroundColor: green['A700'],
      boxShadow: `0 4px 4px ${blueGrey[900]}`
    }
  }
};

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: grey[300],
      '&:hover': {
        color: yellow[900]
      }
    }
  }
};

const MuiListItemButton = {
  styleOverrides: {
    root: {
      borderRadius: '50px',
      '&:hover *': {
        color: yellow[900]
      }
    }
  }
};

const MuiIcon = {
  styleOverrides: {
    root: {
      width: '30px',
      height: '30px',
      color: grey[300]
    }
  }
};

const MuiListItemIcon = {
  styleOverrides: {
    root: {
      color: grey[300]
    }
  }
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      padding: '8px 18px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
    }
  }
};

const MuiInputLabel = {
  styleOverrides: {
    root: {
      padding: '0 8px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
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
      color: grey[300],
      '&:hover': {
        color: yellow[900]
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
      minWidth: '70px',
      backgroundColor: blueGrey[900]
    }
  }
};

export const darkTheme = {
  palette: {
    primary: {
      main: yellow[900],
      light: yellow[600],
      dark: yellow[900]
    }
  },
  typography: {
    fontFamily: "'LexendDeca', sans-serif",
    h1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '700',
      lineHeight: '1',
      color: grey[300]
    },
    h2: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1',
      color: grey[300]
    },
    h3: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '700',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300]
    },
    subtitle1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '300',
      fontSize: '12px',
      lineHeight: '1',
      color: grey[400]
    },
    body1: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300]
    },
    body2: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300]
    },
    button: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300],
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
};
