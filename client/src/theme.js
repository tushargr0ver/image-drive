import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1664c7' },
    secondary: { main: '#ff5c8a' },
    background: { default: '#f1f5f9', paper: '#ffffff' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    error: { main: '#d32f2f' },
    divider: 'rgba(0,0,0,0.12)',
  },
  shape: { borderRadius: 10 },
  spacing: 8,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
    body2: { color: 'rgba(0,0,0,0.65)' }
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true, size: 'small' },
      styleOverrides: { root: { borderRadius: 8, fontWeight: 600 } }
    },
    MuiAppBar: { styleOverrides: { root: { backgroundImage: 'linear-gradient(90deg,#1664c7,#0d47a1)' } } },
    MuiPaper: { styleOverrides: { elevation1: { boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }, root: { backgroundImage: 'none' } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 14 } } },
    MuiInputBase: { styleOverrides: { root: { borderRadius: 8 } } },
  },
});

export default theme;
