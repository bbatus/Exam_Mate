import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Slider,
  FormControlLabel,
  Divider,
  useTheme,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ContrastIcon from '@mui/icons-material/Contrast';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  keyboardNavigation: boolean;
  disableTimeLimit: boolean;
  screenReaderOptimized: boolean;
  focusIndicators: boolean;
  lineSpacing: number;
}

interface AccessibilityMenuProps {
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100, // Yüzde olarak
  highContrast: false,
  keyboardNavigation: false,
  disableTimeLimit: false,
  screenReaderOptimized: false,
  focusIndicators: false,
  lineSpacing: 100, // Yüzde olarak
};

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Ayarları localStorage'dan yükle veya varsayılanları kullan
    const savedSettings = localStorage.getItem('accessibilitySettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  const theme = useTheme();
  
  // Ayarlar değiştiğinde localStorage'a kaydet ve parent komponente bildir
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);
  
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };
  
  const handleSettingChange = (setting: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };
  
  const resetSettings = () => {
    setSettings(defaultSettings);
  };
  
  return (
    <>
      <Tooltip title="Erişilebilirlik Ayarları">
        <IconButton 
          onClick={toggleDrawer(true)}
          sx={{ 
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            zIndex: 1000,
            width: 56,
            height: 56,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
          aria-label="Erişilebilirlik ayarlarını aç"
        >
          <AccessibilityNewIcon />
        </IconButton>
      </Tooltip>
      
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 350 },
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessibilityNewIcon sx={{ mr: 1 }} />
            Erişilebilirlik
          </Typography>
          <IconButton onClick={toggleDrawer(false)} aria-label="Kapat">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <List>
          <ListItem>
            <ListItemIcon>
              <TextFieldsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Yazı Boyutu" 
              secondary={`${settings.fontSize}%`} 
            />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', px: 2 }}>
              <Slider
                value={settings.fontSize}
                onChange={(_, value) => handleSettingChange('fontSize', value)}
                aria-label="Yazı boyutu"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={80}
                max={150}
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <FormatLineSpacingIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Satır Aralığı" 
              secondary={`${settings.lineSpacing}%`} 
            />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', px: 2 }}>
              <Slider
                value={settings.lineSpacing}
                onChange={(_, value) => handleSettingChange('lineSpacing', value)}
                aria-label="Satır aralığı"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={100}
                max={200}
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <ContrastIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Yüksek Kontrast" 
              secondary="Okumayı kolaylaştırmak için kontrastı artırır" 
            />
            <Switch
              edge="end"
              checked={settings.highContrast}
              onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              inputProps={{ 'aria-label': 'Yüksek kontrast modunu aç/kapat' }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <KeyboardIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Klavye Navigasyonu" 
              secondary="Klavye kısayolları ile gezinmeyi etkinleştirir" 
            />
            <Switch
              edge="end"
              checked={settings.keyboardNavigation}
              onChange={(e) => handleSettingChange('keyboardNavigation', e.target.checked)}
              inputProps={{ 'aria-label': 'Klavye navigasyonunu aç/kapat' }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TimerOffIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Zaman Sınırını Kaldır" 
              secondary="Sınav süresini uzatır veya kaldırır" 
            />
            <Switch
              edge="end"
              checked={settings.disableTimeLimit}
              onChange={(e) => handleSettingChange('disableTimeLimit', e.target.checked)}
              inputProps={{ 'aria-label': 'Zaman sınırını kaldır' }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Ekran Okuyucu Uyumlu" 
              secondary="Ekran okuyucular için ek açıklamalar ekler" 
            />
            <Switch
              edge="end"
              checked={settings.screenReaderOptimized}
              onChange={(e) => handleSettingChange('screenReaderOptimized', e.target.checked)}
              inputProps={{ 'aria-label': 'Ekran okuyucu uyumluluğunu aç/kapat' }}
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <TouchAppIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Odak Göstergeleri" 
              secondary="Aktif öğeleri daha belirgin hale getirir" 
            />
            <Switch
              edge="end"
              checked={settings.focusIndicators}
              onChange={(e) => handleSettingChange('focusIndicators', e.target.checked)}
              inputProps={{ 'aria-label': 'Odak göstergelerini aç/kapat' }}
            />
          </ListItem>
        </List>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={resetSettings}
            aria-label="Ayarları sıfırla"
          >
            Sıfırla
          </Button>
          <Button 
            variant="contained" 
            onClick={toggleDrawer(false)}
            aria-label="Ayarları kaydet ve kapat"
          >
            Tamam
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default AccessibilityMenu; 