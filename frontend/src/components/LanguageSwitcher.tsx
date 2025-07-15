import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <ToggleButtonGroup
        value={currentLanguage}
        exclusive
        size="small"
        aria-label="language selector"
      >
        <ToggleButton 
          value="en" 
          onClick={() => changeLanguage('en')}
          sx={{ 
            px: 1,
            py: 0.5,
            fontSize: '0.75rem',
            color: currentLanguage === 'en' ? 'white' : 'inherit',
          }}
        >
          EN
        </ToggleButton>
        <ToggleButton 
          value="tr" 
          onClick={() => changeLanguage('tr')}
          sx={{ 
            px: 1,
            py: 0.5,
            fontSize: '0.75rem',
            color: currentLanguage === 'tr' ? 'white' : 'inherit',
          }}
        >
          TR
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher; 