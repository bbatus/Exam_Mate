import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip title={isDarkMode ? t('theme.switchToLight') : t('theme.switchToDark')}>
      <IconButton 
        onClick={toggleTheme} 
        sx={{ 
          ml: 1,
          color: theme.palette.text.primary,
        }}
      >
        {isDarkMode ? (
          <Brightness7Icon sx={{ color: theme.palette.primary.light }} />
        ) : (
          <Brightness4Icon sx={{ color: theme.palette.primary.light }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle; 