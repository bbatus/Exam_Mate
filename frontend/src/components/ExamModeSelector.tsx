import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import SchoolIcon from '@mui/icons-material/School';
import CategoryIcon from '@mui/icons-material/Category';
import { useTranslation } from 'react-i18next';

export type ExamMode = 'practice' | 'real' | 'topic';

interface ExamModeSelectorProps {
  selectedMode: ExamMode;
  onModeChange: (mode: ExamMode) => void;
}

const ExamModeSelector: React.FC<ExamModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onModeChange(event.target.value as ExamMode);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {t('examMode.title')}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="exam-mode"
          name="exam-mode"
          value={selectedMode}
          onChange={handleChange}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={selectedMode === 'practice' ? 8 : 1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: selectedMode === 'practice' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  bgcolor: selectedMode === 'practice' ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                  transition: 'all 0.3s ease',
                }}
              >
                <FormControlLabel
                  value="practice"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('examMode.practice.title')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {t('examMode.practice.description')}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start', margin: 0 }}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={selectedMode === 'real' ? 8 : 1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: selectedMode === 'real' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  bgcolor: selectedMode === 'real' ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                  transition: 'all 0.3s ease',
                }}
              >
                <FormControlLabel
                  value="real"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <TimerIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('examMode.real.title')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {t('examMode.real.description')}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start', margin: 0 }}
                />
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={selectedMode === 'topic' ? 8 : 1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: selectedMode === 'topic' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  bgcolor: selectedMode === 'topic' ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                  transition: 'all 0.3s ease',
                }}
              >
                <FormControlLabel
                  value="topic"
                  control={<Radio color="primary" />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {t('examMode.topic.title')}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {t('examMode.topic.description')}
                      </Typography>
                    </Box>
                  }
                  sx={{ alignItems: 'flex-start', margin: 0 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ExamModeSelector; 