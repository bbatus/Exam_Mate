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

const StudyAnalyticsPage: React.FC = () => {
  const theme = useTheme();

  return (
    <PageLayout>
      <FadeIn>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Çalışma Analitikleri
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bu sayfa, çalışma alışkanlıklarınızı ve performansınızı analiz eder. Hangi konularda güçlü veya zayıf olduğunuzu, en verimli çalışma zamanlarınızı ve ilerlemenizi görsel grafiklerle takip edebilirsiniz.
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
              Not: Bu analitikler, mevcut oturumunuzdaki çalışma verilerinize dayanmaktadır. Daha kapsamlı analiz için üye olabilirsiniz.
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