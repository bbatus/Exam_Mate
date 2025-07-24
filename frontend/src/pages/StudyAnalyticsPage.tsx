import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import StudyAnalytics from '../components/StudyAnalytics';
import { FadeIn } from '../components/UIAnimations';
import AdBanner from '../components/AdBanner';
import PageLayout from '../components/PageLayout';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../components/visual/AnimatedBackground';
import FloatingIcons from '../components/visual/FloatingIcons';
import ParticleSystem from '../components/visual/ParticleSystem';

const StudyAnalyticsPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <PageLayout>
      <AnimatedBackground />
      <FloatingIcons />
      <ParticleSystem />
      <FadeIn>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {t('analytics.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('analytics.description')}
          </Typography>
          
          <Box 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.info.main, 0.05),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium" color="info.main">
              {t('analytics.note')}
            </Typography>
          </Box>
        </Box>
        
        <StudyAnalytics />
        
        <AdBanner position="bottom" size="large" />
      </FadeIn>
    </PageLayout>
  );
};

export default StudyAnalyticsPage; 