import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import LegalFooter from '../components/LegalFooter';

const CookiesPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          component={RouterLink} 
          to="/" 
          underline="hover" 
          sx={{
            color: theme.palette.primary.main,
            '&:hover': {
              color: theme.palette.primary.dark,
            }
          }}
        >
          {t('common.home')}
        </Link>
        <Typography color="text.primary">{t('legal.cookiePolicy')}</Typography>
      </Breadcrumbs>
      
      <AdBanner position="top" size="small" />
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {t('legal.cookiePolicy')}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {t('legal.lastUpdated')}: 2023-10-01
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. {t('legal.cookies.introduction')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.introductionText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. {t('legal.cookies.whatAreCookies')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.whatAreCookiesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. {t('legal.cookies.typeOfCookies')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.typeOfCookiesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. {t('legal.cookies.howWeUse')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.howWeUseText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. {t('legal.cookies.thirdPartyCookies')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.thirdPartyCookiesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          6. {t('legal.cookies.controlCookies')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.controlCookiesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          7. {t('legal.cookies.changes')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.changesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          8. {t('legal.cookies.contact')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.cookies.contactText')}
        </Typography>
      </Paper>
      
      <AdBanner position="bottom" size="medium" />
      
      <LegalFooter />
    </Container>
  );
};

export default CookiesPage; 