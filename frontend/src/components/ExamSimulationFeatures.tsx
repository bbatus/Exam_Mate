import React, { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
  useTheme,
  alpha,
} from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import WarningIcon from '@mui/icons-material/Warning';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AlarmIcon from '@mui/icons-material/Alarm';

interface ExamSimulationFeaturesProps {
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  examMode: string;
  onTimeUp?: () => void;
}

const ExamSimulationFeatures: React.FC<ExamSimulationFeaturesProps> = ({
  timeRemaining,
  totalTime,
  examMode,
  onTimeUp,
}) => {
  const [showTimeAlert, setShowTimeAlert] = useState<boolean>(false);
  const [showTimeWarning, setShowTimeWarning] = useState<boolean>(false);
  const [showFinalWarning, setShowFinalWarning] = useState<boolean>(false);
  const [isTimerPulsing, setIsTimerPulsing] = useState<boolean>(false);
  const theme = useTheme();

  // Format time in minutes and seconds
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate percentage of time remaining
  const timePercentage = (timeRemaining / totalTime) * 100;

  // Time alerts and warnings
  useEffect(() => {
    // 50% time remaining alert
    if (timeRemaining === Math.floor(totalTime / 2)) {
      setShowTimeAlert(true);
      // Play sound if in real exam mode
      if (examMode === 'real') {
        const audio = new Audio('/sounds/alert.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    }

    // 25% time remaining warning
    if (timeRemaining === Math.floor(totalTime / 4)) {
      setShowTimeWarning(true);
      setIsTimerPulsing(true);
      // Play sound if in real exam mode
      if (examMode === 'real') {
        const audio = new Audio('/sounds/warning.mp3');
        audio.volume = 0.7;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      
      // Reset pulsing after 10 seconds
      setTimeout(() => {
        setIsTimerPulsing(false);
      }, 10000);
    }

    // 5 minutes remaining final warning
    if (timeRemaining === 300) {
      setShowFinalWarning(true);
      setIsTimerPulsing(true);
      // Play sound if in real exam mode
      if (examMode === 'real') {
        const audio = new Audio('/sounds/urgent.mp3');
        audio.volume = 0.8;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    }

    // Time's up
    if (timeRemaining === 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, totalTime, examMode, onTimeUp]);

  // Get color based on time remaining
  const getTimeColor = () => {
    if (timePercentage <= 25) return theme.palette.error.main;
    if (timePercentage <= 50) return theme.palette.warning.main;
    return theme.palette.primary.main;
  };

  return (
    <>
      {/* Time Progress Bar */}
      <Box sx={{ 
        position: 'relative', 
        mt: 1, 
        mb: 2, 
        borderRadius: 2, 
        overflow: 'hidden',
        border: `1px solid ${alpha(getTimeColor(), 0.3)}`,
      }}>
        <LinearProgress
          variant="determinate"
          value={timePercentage}
          sx={{
            height: 10,
            backgroundColor: alpha(getTimeColor(), 0.1),
            '& .MuiLinearProgress-bar': {
              backgroundColor: getTimeColor(),
              transition: 'transform 1s linear',
            },
          }}
        />
        {/* Büyük ve dikkat çekici sayaç */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexDirection: 'column',
          animation: isTimerPulsing ? 'pulse 1s infinite' : 'none',
          '@keyframes pulse': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.5 },
            '100%': { opacity: 1 },
          },
        }}>
          <TimerIcon fontSize="medium" sx={{ color: getTimeColor(), mb: 0.5 }} />
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ color: getTimeColor(), letterSpacing: 2, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}
          >
            {formatTime(timeRemaining)}
          </Typography>
        </Box>
      </Box>

      {/* Time Alert Notifications */}
      <Snackbar
        open={showTimeAlert}
        autoHideDuration={6000}
        onClose={() => setShowTimeAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="info" 
          icon={<NotificationsIcon />}
          onClose={() => setShowTimeAlert(false)}
          sx={{ width: '100%' }}
        >
          Sürenin yarısı tamamlandı! {formatTime(timeRemaining)} kaldı.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showTimeWarning}
        autoHideDuration={8000}
        onClose={() => setShowTimeWarning(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="warning" 
          icon={<AlarmIcon />}
          onClose={() => setShowTimeWarning(false)}
          sx={{ width: '100%' }}
        >
          Dikkat! Sürenin dörtte üçü tamamlandı. {formatTime(timeRemaining)} kaldı.
        </Alert>
      </Snackbar>

      {/* Final Warning Dialog */}
      <Dialog
        open={showFinalWarning}
        onClose={() => setShowFinalWarning(false)}
      >
        <DialogTitle sx={{ 
          bgcolor: alpha(theme.palette.error.main, 0.1), 
          color: theme.palette.error.main,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <WarningIcon />
          Son 5 Dakika!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom sx={{ mt: 1 }}>
            Sınavı tamamlamak için sadece 5 dakikanız kaldı!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lütfen kalan zamanınızı cevaplanmamış soruları gözden geçirmek için kullanın.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFinalWarning(false)} variant="contained" color="primary">
            Anladım
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExamSimulationFeatures; 