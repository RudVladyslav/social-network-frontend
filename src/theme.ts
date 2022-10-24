import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6664fc'
    },
    secondary: {
      main: '#ffffff'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.palette.primary.main,
          padding: '10px'
        }
      })
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})
