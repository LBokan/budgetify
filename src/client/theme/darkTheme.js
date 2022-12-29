import { createTheme } from '@mui/material';
import { blueGrey, green, grey, red, teal, yellow } from '@mui/material/colors';

import '@/assets/styles/fonts/fonts.css';

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
      boxShadow: `0 1px 4px ${blueGrey[900]}`,
      '&:disabled': {
        backgroundColor: blueGrey[700],
        boxShadow: 'none'
      }
    },
    text: {
      border: 'none',
      backgroundColor: blueGrey[600],
      '&:hover': {
        backgroundColor: yellow[900]
      }
    },
    outlined: {
      border: `1px solid ${grey[50]}`,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: yellow[900]
      }
    },
    danger: {
      color: grey[50],
      backgroundColor: red[500],
      '&:hover': {
        color: teal[800],
        backgroundColor: yellow[900]
      },
      '&:disabled': {
        backgroundColor: blueGrey[700],
        boxShadow: 'none'
      }
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
    },
    colorInherit: {
      color: grey[300]
    },
    colorSuccess: {
      color: grey[300],
      backgroundColor: teal[800],
      '&:hover': {
        color: grey[300],
        backgroundColor: yellow[900]
      }
    },
    colorError: {
      color: grey[300],
      backgroundColor: red[500],
      '&:hover': {
        color: grey[300],
        backgroundColor: yellow[900]
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

const MuiSelect = {
  styleOverrides: {
    root: {
      padding: '0 8px',
      maxHeight: '45px',
      borderRadius: '10px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
    },
    icon: {
      color: grey[300]
    }
  }
};

const MuiSkeleton = {
  styleOverrides: {
    rectangular: {
      height: '45px',
      borderRadius: '10px',
      backgroundColor: yellow[900]
    }
  }
};

const MuiInputLabel = {
  styleOverrides: {
    root: {
      zIndex: '2',
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

const MuiMenu = {
  styleOverrides: {
    list: {
      backgroundColor: blueGrey[600]
    }
  }
};

const MuiTable = {
  styleOverrides: {
    root: {
      padding: '10px',
      borderCollapse: 'separate',
      borderRadius: '10px',
      overflow: 'hidden'
    }
  }
};

const MuiTableCell = {
  styleOverrides: {
    root: {
      color: grey[300],
      fontSize: '12px'
    }
  }
};

const MuiDrawer = {
  styleOverrides: {
    paper: {
      zIndex: '8',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '95px 15px 25px',
      minWidth: '70px',
      backgroundColor: blueGrey[900]
    }
  }
};

const MuiAlert = {
  styleOverrides: {
    message: {
      lineHeight: 1.3
    }
  }
};

const MuiPaginationItem = {
  styleOverrides: {
    text: {
      color: grey[50]
    }
  }
};

export const darkTheme = createTheme({
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
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1.2',
      color: grey[300]
    },
    h4: {
      fontFamily: "'LexendDeca', sans-serif",
      fontWeight: '400',
      fontSize: '12px',
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
    MuiSelect,
    MuiSkeleton,
    MuiInputLabel,
    MuiFormHelperText,
    MuiLink,
    MuiMenu,
    MuiTable,
    MuiTableCell,
    MuiDrawer,
    MuiAlert,
    MuiPaginationItem
  }
});
