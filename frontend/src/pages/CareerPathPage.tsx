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
import CareerPathMap from '../components/CareerPathMap';
import { FadeIn } from '../components/UIAnimations';
import AdBanner from '../components/AdBanner';
import PageLayout from '../components/PageLayout';

const CareerPathPage: React.FC = () => {
  const [selectedCareerPathId, setSelectedCareerPathId] = useState<number>(1); // Default to Cloud Engineer
  const theme = useTheme();

  const handleCareerPathChange = (event: SelectChangeEvent<number>) => {
    setSelectedCareerPathId(Number(event.target.value));
  };

  return (
    <PageLayout>
      <FadeIn>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Kariyer Yolu Haritası
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bu interaktif harita, seçilen kariyer yolundaki sertifikaları ve aralarındaki ilişkileri görselleştirir. Hangi sertifikaları hangi sırayla almanız gerektiğini görerek kariyer planınızı daha etkili bir şekilde yapabilirsiniz.
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
                Kariyer yolu seçin:
              </Typography>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="career-path-select-label">Kariyer Yolu</InputLabel>
                <Select
                  labelId="career-path-select-label"
                  id="career-path-select"
                  value={selectedCareerPathId}
                  label="Kariyer Yolu"
                  onChange={handleCareerPathChange}
                >
                  <MenuItem value={1}>Google Cloud Engineer</MenuItem>
                  <MenuItem value={2}>AWS Solutions Architect</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Box>
        
        <CareerPathMap careerPathId={selectedCareerPathId} />
        
        <AdBanner position="bottom" size="large" />
      </FadeIn>
    </PageLayout>
  );
};

export default CareerPathPage; 