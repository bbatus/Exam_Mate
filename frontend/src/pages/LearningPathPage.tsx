import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  alpha,
} from '@mui/material';
import LearningPathMap from '../components/LearningPathMap';
import { FadeIn } from '../components/UIAnimations';
import AdBanner from '../components/AdBanner';
import PageLayout from '../components/PageLayout';
import { useTranslation } from 'react-i18next';
import { getTranslatedExamTitle } from '../lib/utils/examTitleUtils';
import AnimatedBackground from '../components/visual/AnimatedBackground';
import FloatingIcons from '../components/visual/FloatingIcons';
import ParticleSystem from '../components/visual/ParticleSystem';

const LearningPathPage: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<number>(1); // Default to Google Cloud Digital Leader
  const theme = useTheme();
  const { t } = useTranslation();

  const handleExamChange = (event: SelectChangeEvent<number>) => {
    setSelectedExamId(Number(event.target.value));
  };

  return (
    <PageLayout>
      <AnimatedBackground />
      <FloatingIcons />
      <ParticleSystem />
      <FadeIn>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {t('learningPath.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('learningPath.description')}
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.info.main, 0.05),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {t('learningPath.selectExam')}
              </Typography>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="exam-select-label">{t('learningPath.examLabel')}</InputLabel>
                <Select
                  labelId="exam-select-label"
                  id="exam-select"
                  value={selectedExamId}
                  label={t('learningPath.examLabel')}
                  onChange={handleExamChange}
                >
                  <MenuItem value={1}>{getTranslatedExamTitle('Google Cloud Digital Leader', t)}</MenuItem>
                  <MenuItem value={2}>{getTranslatedExamTitle('Google Cloud Generative AI Leader', t)}</MenuItem>
                  <MenuItem value={3}>{getTranslatedExamTitle('Google Cloud Associate Cloud Engineer', t)}</MenuItem>
                  <MenuItem value={5}>{getTranslatedExamTitle('Kubernetes', t)}</MenuItem>
                  <MenuItem value={16}>{getTranslatedExamTitle('Kubernetes Orta Seviye', t)}</MenuItem>
                  <MenuItem value={17}>{getTranslatedExamTitle('English A1 Level', t)}</MenuItem>
                  <MenuItem value={18}>{getTranslatedExamTitle('English A2 Level', t)}</MenuItem>
                  <MenuItem value={19}>{getTranslatedExamTitle('English B1 Level', t)}</MenuItem>
                  <MenuItem value={20}>{getTranslatedExamTitle('English B2 Level', t)}</MenuItem>
                  <MenuItem value={21}>{getTranslatedExamTitle('AWS Cloud Practitioner', t)}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Box>
        
        <LearningPathMap examId={selectedExamId} />
        
        <AdBanner position="bottom" size="large" />
      </FadeIn>
    </PageLayout>
  );
};

export default LearningPathPage; 