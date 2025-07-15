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

const LearningPathPage: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<number>(1); // Default to Google Cloud Digital Leader
  const theme = useTheme();

  const handleExamChange = (event: SelectChangeEvent<number>) => {
    setSelectedExamId(Number(event.target.value));
  };

  return (
    <PageLayout>
      <FadeIn>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Konu Haritası
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bu interaktif harita, seçilen sınavın konu başlıklarını ve aralarındaki ilişkileri görselleştirir. Konuların bağımlılıklarını görerek çalışma planınızı daha etkili bir şekilde yapabilirsiniz.
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
                Sınav seçin:
              </Typography>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="exam-select-label">Sınav</InputLabel>
                <Select
                  labelId="exam-select-label"
                  id="exam-select"
                  value={selectedExamId}
                  label="Sınav"
                  onChange={handleExamChange}
                >
                  <MenuItem value={1}>Google Cloud Digital Leader</MenuItem>
                  <MenuItem value={2}>AWS Certified Cloud Practitioner</MenuItem>
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