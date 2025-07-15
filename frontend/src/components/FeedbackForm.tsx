import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BugReportIcon from '@mui/icons-material/BugReport';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type FeedbackType = 'error' | 'suggestion' | 'satisfaction';

interface FeedbackFormProps {
  examId?: number;
  questionId?: number;
  onClose?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ examId, questionId, onClose }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('error');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [satisfaction, setSatisfaction] = useState('3');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const theme = useTheme();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Gerçek bir API çağrısı yapılabilir
      // const response = await fetch('http://localhost:5001/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ feedbackType, message, email, examId, questionId, satisfaction }),
      // });
      
      // Şimdilik başarılı olduğunu varsayalım
      setSnackbarMessage('Geri bildiriminiz için teşekkürler!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Form alanlarını temizle
      setMessage('');
      setEmail('');
      setSatisfaction('3');
      
      // Kapatma fonksiyonu varsa çağır
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Geri bildirim gönderilirken hata oluştu:', error);
      setSnackbarMessage('Geri bildirim gönderilirken bir hata oluştu.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <Paper sx={{ p: 3, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {feedbackType === 'error' && <BugReportIcon sx={{ mr: 1, color: theme.palette.error.main }} />}
        {feedbackType === 'suggestion' && <LightbulbIcon sx={{ mr: 1, color: theme.palette.warning.main }} />}
        {feedbackType === 'satisfaction' && <ThumbUpIcon sx={{ mr: 1, color: theme.palette.success.main }} />}
        <Typography variant="h5" component="h2">
          Geri Bildirim
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <FormLabel component="legend">Geri Bildirim Türü</FormLabel>
          <RadioGroup
            row
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
          >
            <FormControlLabel 
              value="error" 
              control={<Radio />} 
              label="Hata Bildirimi" 
              sx={{ 
                px: 1, 
                borderRadius: 1, 
                ...(feedbackType === 'error' && { 
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  border: `1px solid ${theme.palette.error.main}`,
                }) 
              }}
            />
            <FormControlLabel 
              value="suggestion" 
              control={<Radio />} 
              label="İyileştirme Önerisi" 
              sx={{ 
                px: 1, 
                borderRadius: 1, 
                ...(feedbackType === 'suggestion' && { 
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${theme.palette.warning.main}`,
                }) 
              }}
            />
            <FormControlLabel 
              value="satisfaction" 
              control={<Radio />} 
              label="Memnuniyet Anketi" 
              sx={{ 
                px: 1, 
                borderRadius: 1, 
                ...(feedbackType === 'satisfaction' && { 
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  border: `1px solid ${theme.palette.success.main}`,
                }) 
              }}
            />
          </RadioGroup>
        </FormControl>
        
        {feedbackType === 'satisfaction' && (
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="satisfaction-label">Memnuniyet Dereceniz</InputLabel>
            <Select
              labelId="satisfaction-label"
              value={satisfaction}
              label="Memnuniyet Dereceniz"
              onChange={(e) => setSatisfaction(e.target.value)}
            >
              <MenuItem value="1">1 - Hiç memnun değilim</MenuItem>
              <MenuItem value="2">2 - Memnun değilim</MenuItem>
              <MenuItem value="3">3 - Kararsızım</MenuItem>
              <MenuItem value="4">4 - Memnunum</MenuItem>
              <MenuItem value="5">5 - Çok memnunum</MenuItem>
            </Select>
          </FormControl>
        )}
        
        {examId && questionId && feedbackType === 'error' && (
          <Box sx={{ mb: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Bildiriminiz aşağıdaki soru için kaydedilecektir:
            </Typography>
            <Typography variant="body2">
              Sınav ID: {examId}, Soru ID: {questionId}
            </Typography>
          </Box>
        )}
        
        <TextField
          fullWidth
          label={feedbackType === 'error' ? 'Hatayı açıklayın' : feedbackType === 'suggestion' ? 'Önerinizi yazın' : 'Yorumunuzu yazın'}
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        
        <TextField
          fullWidth
          label="E-posta (isteğe bağlı)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="Size geri dönüş yapmamızı isterseniz e-posta adresinizi paylaşabilirsiniz."
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {onClose && (
            <Button variant="outlined" onClick={onClose}>
              İptal
            </Button>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            endIcon={<SendIcon />}
            color={feedbackType === 'error' ? 'error' : feedbackType === 'suggestion' ? 'warning' : 'primary'}
          >
            Gönder
          </Button>
        </Box>
      </form>
      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FeedbackForm; 