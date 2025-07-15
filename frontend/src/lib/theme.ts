import { createTheme, PaletteMode } from '@mui/material';

// Tema oluşturan fonksiyon
export const createAppTheme = (mode: PaletteMode, highContrast: boolean = false) => {
  // Yüksek kontrast için renkleri ayarla
  const getColors = () => {
    if (highContrast) {
      return mode === 'light'
        ? {
            // Yüksek kontrastlı açık tema
            primary: {
              main: '#0000CC', // Koyu mavi
              light: '#0066FF',
              dark: '#000099',
            },
            secondary: {
              main: '#006600', // Koyu yeşil
              light: '#009900',
              dark: '#004400',
            },
            background: {
              default: '#FFFFFF', // Beyaz
              paper: '#F5F5F5', // Açık gri
            },
            text: {
              primary: '#000000', // Siyah
              secondary: '#333333', // Koyu gri
            },
          }
        : {
            // Yüksek kontrastlı koyu tema
            primary: {
              main: '#33CCFF', // Açık mavi
              light: '#66DDFF',
              dark: '#0099CC',
            },
            secondary: {
              main: '#33FF33', // Parlak yeşil
              light: '#66FF66',
              dark: '#00CC00',
            },
            background: {
              default: '#000000', // Siyah
              paper: '#121212', // Çok koyu gri
            },
            text: {
              primary: '#FFFFFF', // Beyaz
              secondary: '#CCCCCC', // Açık gri
            },
          };
    }
    
    return mode === 'light'
      ? {
          // Normal açık tema
          primary: {
            main: '#6366f1', // Indigo
            light: '#818cf8',
            dark: '#4338ca',
          },
          secondary: {
            main: '#10b981', // Emerald
            light: '#34d399',
            dark: '#059669',
          },
          background: {
            default: '#f8fafc', // Slate 50
            paper: '#ffffff', // White
          },
          text: {
            primary: '#0f172a', // Slate 900
            secondary: '#475569', // Slate 600
          },
        }
      : {
          // Normal koyu tema
          primary: {
            main: '#6366f1', // Indigo
            light: '#818cf8',
            dark: '#4338ca',
          },
          secondary: {
            main: '#10b981', // Emerald
            light: '#34d399',
            dark: '#059669',
          },
          background: {
            default: '#0f172a', // Slate 900
            paper: '#1e293b', // Slate 800
          },
          text: {
            primary: '#f1f5f9', // Slate 100
            secondary: '#cbd5e1', // Slate 300
          },
        };
  };

  const colors = getColors();

  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: highContrast ? 4 : 12, // Yüksek kontrast için daha az yuvarlak köşeler
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: highContrast ? '4px' : '8px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: highContrast ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: highContrast ? '4px' : '16px',
            boxShadow: highContrast ? '0 1px 3px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backdropFilter: highContrast ? 'none' : 'blur(8px)',
            backgroundColor: highContrast
              ? (mode === 'light' ? '#0066CC' : '#333333')
              : (mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'),
          },
        },
      },
    },
  });
};

// Tema tercihini localStorage'da saklamak için fonksiyonlar
export const getStoredTheme = (): PaletteMode => {
  const storedTheme = localStorage.getItem('themeMode');
  return (storedTheme as PaletteMode) || 'dark'; // Varsayılan olarak koyu tema
};

export const setStoredTheme = (mode: PaletteMode): void => {
  localStorage.setItem('themeMode', mode);
}; 