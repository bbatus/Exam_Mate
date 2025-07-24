import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import LegalFooter from '../components/LegalFooter';

const TermsPage: React.FC = () => {
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
        <Typography color="text.primary">{t('legal.termsOfService')}</Typography>
      </Breadcrumbs>
      
      <AdBanner position="top" size="small" />
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {t('legal.termsOfService')}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {t('legal.lastUpdated')}: 2023-10-01
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. {t('legal.terms.acceptance')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.acceptanceText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. {t('legal.terms.intellectualProperty')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.intellectualPropertyText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. {t('legal.terms.userConduct')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.userConductText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. {t('legal.terms.disclaimer')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.disclaimerText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. {t('legal.terms.limitation')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.limitationText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          6. {t('legal.terms.governing')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.governingText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          7. {t('legal.terms.changes')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.changesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          8. {t('legal.terms.contact')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.terms.contactText')}
        </Typography>
      </Paper>
      
      <AdBanner position="bottom" size="medium" />
      
      <LegalFooter />
    </Container>
  );
};

export default TermsPage; 