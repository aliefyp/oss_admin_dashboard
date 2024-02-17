import { createTheme } from '@mui/material/styles';

const setupTheme = () => createTheme({
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
  palette: {
    primary: {
      main: '#1C25E7',
    }
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderBottom: '2px solid #e0e0e0',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '32px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: 'translate(0, -9px) scale(0.75)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#1C25E7',
          fontWeight: 700,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          boxShadow: 'none',
          borderRadius: '8px',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 700,
          fontSize: '2.5rem',
        },
        h2: {
          fontWeight: 700,
          fontSize: '2rem',
        },
        h3: {
          fontWeight: 700,
          fontSize: '1.75rem',
        },
        h4: {
          fontWeight: 700,
          fontSize: '1.5rem',
        },
        h5: {
          fontWeight: 700,
          fontSize: '1.25rem',
        },
        h6: {
          fontWeight: 700,
          fontSize: '1rem',
        },
      }
    }
  },
});

export default setupTheme;
