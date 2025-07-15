import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect, createContext } from 'react';
import ExamListPage from './pages/ExamListPage';
import QuizPage from './pages/QuizPage';
import ExamResultPage from './pages/ExamResultPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ExamsPage from './pages/admin/ExamsPage';
import ExamFormPage from './pages/admin/ExamFormPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import LearningPathPage from './pages/LearningPathPage';
import CareerPathPage from './pages/CareerPathPage';
import StudyAnalyticsPage from './pages/StudyAnalyticsPage';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
  IconButton,
  Box,
  useMediaQuery,
  PaletteMode,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
// i18n için gerekli importlar
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import { createAppTheme, getStoredTheme, setStoredTheme } from './lib/theme';
import LegalFooter from './components/LegalFooter';
import AccessibilityMenu from './components/AccessibilityMenu';
import PageLayout from './components/PageLayout';

// Erişilebilirlik ayarları için context
interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  keyboardNavigation: boolean;
  disableTimeLimit: boolean;
  screenReaderOptimized: boolean;
  focusIndicators: boolean;
  lineSpacing: number;
}

export const AccessibilityContext = createContext<AccessibilitySettings>({
  fontSize: 100,
  highContrast: false,
  keyboardNavigation: false,
  disableTimeLimit: false,
  screenReaderOptimized: false,
  focusIndicators: false,
  lineSpacing: 100,
});

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<PaletteMode>(getStoredTheme());
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    keyboardNavigation: false,
    disableTimeLimit: false,
    screenReaderOptimized: false,
    focusIndicators: false,
    lineSpacing: 100,
  });
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  const theme = useMemo(() => createAppTheme(mode, accessibilitySettings.highContrast), [mode, accessibilitySettings.highContrast]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setStoredTheme(newMode);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };
  
  // Erişilebilirlik ayarlarını uygula
  useEffect(() => {
    // Font size ayarı
    document.documentElement.style.fontSize = `${accessibilitySettings.fontSize}%`;
    
    // Satır aralığı ayarı
    document.body.style.lineHeight = `${accessibilitySettings.lineSpacing}%`;
    
    // Odak göstergeleri
    if (accessibilitySettings.focusIndicators) {
      const style = document.createElement('style');
      style.id = 'focus-indicators';
      style.innerHTML = `
        :focus {
          outline: 3px solid #2196f3 !important;
          outline-offset: 2px !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('focus-indicators');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
    
    // Yüksek kontrast için ek CSS
    if (accessibilitySettings.highContrast) {
      const style = document.createElement('style');
      style.id = 'high-contrast';
      style.innerHTML = `
        body {
          color: ${mode === 'dark' ? '#ffffff !important' : '#000000 !important'};
          background: ${mode === 'dark' ? '#000000 !important' : '#ffffff !important'};
        }
        .MuiPaper-root {
          background-color: ${mode === 'dark' ? '#121212 !important' : '#f5f5f5 !important'};
          color: ${mode === 'dark' ? '#ffffff !important' : '#000000 !important'};
          border: 1px solid ${mode === 'dark' ? '#555555 !important' : '#cccccc !important'};
        }
      `;
      document.head.appendChild(style);
    } else {
      const existingStyle = document.getElementById('high-contrast');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
    
  }, [accessibilitySettings, mode]);

  // URL'yi kontrol ederek admin sayfalarında olup olmadığımızı belirle
  const isAdminPage = window.location.pathname.startsWith('/admin');

  // Sayfa arkaplan rengini tema moduna göre ayarla
  useEffect(() => {
    if (!accessibilitySettings.highContrast) {
      const backgroundColor = mode === 'light' 
        ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' 
        : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)';
      
      document.body.style.background = backgroundColor;
    }
  }, [mode, accessibilitySettings.highContrast]);
  
  // Klavye navigasyonu için event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!accessibilitySettings.keyboardNavigation) return;
      
      // Tab tuşu ile gezinme için outline'ları göster
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // Diğer klavye kısayolları
      if (e.altKey) {
        switch (e.key) {
          case 'h': // Ana sayfaya git
            navigate('/');
            break;
          case 't': // Tema değiştir
            toggleTheme();
            break;
          case 'a': // Erişilebilirlik menüsünü aç
            document.getElementById('accessibility-button')?.click();
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [accessibilitySettings.keyboardNavigation, navigate, toggleTheme]);

  // Admin sayfalarında AppBar göstermeyelim, çünkü AdminLayout içinde zaten var
  if (isAdminPage) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AccessibilityContext.Provider value={accessibilitySettings}>
          <Box sx={{ 
            minHeight: '100vh',
            backgroundSize: '200% 200%',
            animation: 'gradient-xy 15s ease infinite',
          }}>
            <Routes>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/exams" element={<ExamsPage />} />
              <Route path="/admin/exams/new" element={<ExamFormPage />} />
              <Route path="/admin/exams/:id/edit" element={<ExamFormPage />} />
            </Routes>
            <AccessibilityMenu onSettingsChange={setAccessibilitySettings} />
          </Box>
        </AccessibilityContext.Provider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AccessibilityContext.Provider value={accessibilitySettings}>
        <Box sx={{ 
          minHeight: '100vh',
          backgroundSize: '200% 200%',
          animation: 'gradient-xy 15s ease infinite',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <AppBar 
            position="sticky" 
            elevation={0}
            sx={{
              ...(accessibilitySettings.highContrast && {
                backgroundColor: mode === 'dark' ? '#333333 !important' : '#0066cc !important',
              })
            }}
          >
            <Toolbar>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: 'pointer',
                  mr: 2
                }}
                onClick={() => navigate('/')}
              >
                <img 
                  src="/logo.svg" 
                  alt="Exam Mate Logo" 
                  style={{ 
                    height: '40px', 
                    marginRight: '10px',
                    filter: mode === 'dark' ? 'brightness(1.2)' : 'none'
                  }} 
                />
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  component="div" 
                  sx={{ 
                    fontWeight: 700,
                    ...(accessibilitySettings.highContrast 
                      ? { color: 'inherit' } 
                      : {
                        background: 'linear-gradient(90deg, #6366f1, #10b981)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      })
                  }}
                >
                  {t('common.appName')}
                </Typography>
              </Box>
              
              {/* New navigation menu */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                <Button 
                  color="inherit" 
                  startIcon={<MapIcon />}
                  onClick={() => navigate('/learning-path')}
                  sx={{ mx: 0.5 }}
                >
                  Konu Haritası
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<WorkIcon />}
                  onClick={() => navigate('/career-path')}
                  sx={{ mx: 0.5 }}
                >
                  Kariyer Yolu
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/analytics')}
                  sx={{ mx: 0.5 }}
                >
                  Analitik
                </Button>
              </Box>
              
              {/* Mobile menu */}
              <Box sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}>
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleNavigate('/learning-path')}>
                    <MapIcon sx={{ mr: 1 }} /> Konu Haritası
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/career-path')}>
                    <WorkIcon sx={{ mr: 1 }} /> Kariyer Yolu
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/analytics')}>
                    <AssessmentIcon sx={{ mr: 1 }} /> Analitik
                  </MenuItem>
                </Menu>
              </Box>
              
              <ThemeToggle toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
              <LanguageSwitcher />
            </Toolbar>
          </AppBar>
          <Box 
            sx={{ 
              mt: { xs: 2, sm: 4 }, 
              mb: { xs: 4, sm: 8 },
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<ExamListPage />} />
              <Route path="/quiz/:examId" element={<QuizPage />} />
              <Route path="/results/:resultId" element={<ExamResultPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/learning-path" element={<LearningPathPage />} />
              <Route path="/career-path" element={<CareerPathPage />} />
              <Route path="/analytics" element={<StudyAnalyticsPage />} />
            </Routes>
          </Box>
          <Container maxWidth="lg">
            <LegalFooter />
          </Container>
          <AccessibilityMenu onSettingsChange={setAccessibilitySettings} />
        </Box>
      </AccessibilityContext.Provider>
    </ThemeProvider>
  );
}

export default App;
