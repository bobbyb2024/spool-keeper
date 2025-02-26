import { createTheme, alpha } from '@mui/material/styles';

const withAlphas = (color: any) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none'
        },
        sizeSmall: {
          padding: '6px 16px'
        },
        sizeMedium: {
          padding: '8px 20px'
        },
        sizeLarge: {
          padding: '11px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '32px 24px',
          '&.MuiPaper-elevation1': {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  },
  palette: {
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },
    background: {
      default: '#F9FAFC',
      paper: '#FFFFFF'
    },
    divider: '#E6E8F0',
    primary: withAlphas({
      main: '#2196f3',
      light: '#64B6F7',
      dark: '#0B79D0',
      contrastText: '#FFFFFF'
    }),
    secondary: withAlphas({
      main: '#10B981',
      light: '#3FC79A',
      dark: '#0B815A',
      contrastText: '#FFFFFF'
    }),
    success: withAlphas({
      main: '#14B8A6',
      light: '#43C6B7',
      dark: '#0E8074',
      contrastText: '#FFFFFF'
    }),
    warning: withAlphas({
      main: '#FFB020',
      light: '#FFBF4C',
      dark: '#B27B16',
      contrastText: '#FFFFFF'
    }),
    error: withAlphas({
      main: '#D14343',
      light: '#DA6868',
      dark: '#922E2E',
      contrastText: '#FFFFFF'
    }),
    text: {
      primary: '#121828',
      secondary: '#65748B',
      disabled: 'rgba(55, 65, 81, 0.48)'
    }
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.08)',
    '0px 1px 5px rgba(0, 0, 0, 0.08)',
    '0px 1px 8px rgba(0, 0, 0, 0.08)',
    '0px 1px 10px rgba(0, 0, 0, 0.08)',
    '0px 1px 14px rgba(0, 0, 0, 0.08)',
    '0px 1px 18px rgba(0, 0, 0, 0.08)',
    '0px 2px 16px rgba(0, 0, 0, 0.08)',
    '0px 3px 14px rgba(0, 0, 0, 0.08)',
    '0px 3px 16px rgba(0, 0, 0, 0.08)',
    '0px 4px 18px rgba(0, 0, 0, 0.08)',
    '0px 4px 20px rgba(0, 0, 0, 0.08)',
    '0px 5px 22px rgba(0, 0, 0, 0.08)',
    '0px 5px 24px rgba(0, 0, 0, 0.08)',
    '0px 5px 26px rgba(0, 0, 0, 0.08)',
    '0px 6px 28px rgba(0, 0, 0, 0.08)',
    '0px 6px 30px rgba(0, 0, 0, 0.08)',
    '0px 6px 32px rgba(0, 0, 0, 0.08)',
    '0px 7px 34px rgba(0, 0, 0, 0.08)',
    '0px 7px 36px rgba(0, 0, 0, 0.08)',
    '0px 7px 38px rgba(0, 0, 0, 0.08)',
    '0px 8px 40px rgba(0, 0, 0, 0.08)',
    '0px 8px 42px rgba(0, 0, 0, 0.08)',
    '0px 9px 44px rgba(0, 0, 0, 0.08)',
    '0px 9px 46px rgba(0, 0, 0, 0.08)'
  ]
}; 