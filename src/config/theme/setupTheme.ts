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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
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
        },
        h2: {
          fontWeight: 700,
        },
        h3: {
          fontWeight: 700,
        },
        h4: {
          fontWeight: 700,
        },
        h5: {
          fontWeight: 700,
        },
        h6: {
          fontWeight: 700,
        },
      }
    }
  },
});

export default setupTheme;
