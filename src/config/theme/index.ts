import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: 'none',
          border: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

export default theme;
