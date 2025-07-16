import React from 'react';
import { Box, Typography, Link, Divider, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * LegalFooter Component
 * Displays copyright information and links to legal pages
 */
const LegalFooter: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 6, 
        mb: 2,
        py: 3,
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: 2,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <img 
          src="/logo.svg" 
          alt="Exam Mate Logo" 
          style={{ 
            height: '30px', 
            marginRight: '10px',
            filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none'
          }} 
        />
        <Typography variant="h6" color="text.primary">
          Exam Mate
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        © {currentYear} Exam Mate v2.0. {t('footer.allRightsReserved')}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mt: 1 }}>
        <Link 
          href="/terms" 
          color="inherit" 
          underline="hover" 
          variant="body2"
          sx={{ mx: 1 }}
        >
          {t('footer.termsOfService')}
        </Link>
        
        <Link 
          href="/privacy" 
          color="inherit" 
          underline="hover" 
          variant="body2"
          sx={{ mx: 1 }}
        >
          {t('footer.privacyPolicy')}
        </Link>
        
        <Link 
          href="/cookies" 
          color="inherit" 
          underline="hover" 
          variant="body2"
          sx={{ mx: 1 }}
        >
          {t('footer.cookiePolicy')}
        </Link>
      </Box>
    </Box>
  );
};

export default LegalFooter; 