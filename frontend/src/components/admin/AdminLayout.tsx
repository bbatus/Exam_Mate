import React, { ReactNode, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Button,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggle from '../ThemeToggle';
import { getStoredTheme, setStoredTheme } from '../../lib/theme';
import { PaletteMode } from '@mui/material';

interface AdminLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<PaletteMode>(getStoredTheme());
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setStoredTheme(newMode);
    // Sayfayı yenile (tema değişikliğinin tüm bileşenlere yansıması için)
    window.location.reload();
  };

  const menuItems = [
    {
      text: t('admin.dashboard'),
      icon: <DashboardIcon />,
      path: '/admin/dashboard',
    },
    {
      text: t('admin.examManagement'),
      icon: <QuizIcon />,
      path: '/admin/exams',
    },
  ];

  const drawer = (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/admin/dashboard')}
        >
          <img 
            src="/logo.svg" 
            alt="Exam Mate Admin Logo" 
            style={{ 
              height: '32px', 
              marginRight: '10px',
              filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none'
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #6366f1, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('admin.title')}
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) handleDrawerToggle();
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderColor: alpha(theme.palette.error.main, 0.5),
            color: theme.palette.error.main,
            '&:hover': {
              borderColor: theme.palette.error.main,
              backgroundColor: alpha(theme.palette.error.main, 0.04),
            },
          }}
        >
          {t('admin.logout')}
        </Button>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 'none',
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha(theme.palette.background.default, 0.8),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle toggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="admin navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;

 