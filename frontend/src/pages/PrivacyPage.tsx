import React from 'react';
import { Container, Typography, Paper, Box, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import LegalFooter from '../components/LegalFooter';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          {t('common.home')}
        </Link>
        <Typography color="text.primary">{t('legal.privacyPolicy')}</Typography>
      </Breadcrumbs>
      
      <AdBanner position="top" size="small" />
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {t('legal.privacyPolicy')}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {t('legal.lastUpdated')}: 2023-10-01
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. {t('legal.privacy.introduction')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.introductionText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. {t('legal.privacy.informationCollection')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.informationCollectionText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. {t('legal.privacy.cookiesUsage')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.cookiesUsageText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          4. {t('legal.privacy.thirdPartyServices')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.thirdPartyServicesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          5. {t('legal.privacy.dataProtection')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.dataProtectionText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          6. {t('legal.privacy.userRights')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.userRightsText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          7. {t('legal.privacy.changes')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.changesText')}
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          8. {t('legal.privacy.contact')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('legal.privacy.contactText')}
        </Typography>
      </Paper>
      
      <AdBanner position="bottom" size="medium" />
      
      <LegalFooter />
    </Container>
  );
};

export default PrivacyPage; 