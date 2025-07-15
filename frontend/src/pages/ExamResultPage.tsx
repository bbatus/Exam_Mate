import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
  Grid,
  Paper,
  Chip,
  useTheme,
  alpha,
  Avatar,
  Button,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdBanner from '../components/AdBanner';

interface QuestionAnswer {
  id: number;
  questionId: number;
  selectedAnswer: string | null;
  isCorrect: boolean;
  question: {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

interface ExamResult {
  id: number;
  examId: number;
  score: number;
  totalQuestions: number;
  createdAt: string;
  questionAnswers: QuestionAnswer[];
  exam: {
    id: number;
    title: string;
  };
}

const ExamResultPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/exams/results/${resultId}`);
        if (!response.ok) {
          throw new Error('Sonuç yüklenirken bir sorun oluştu.');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('API hatası:', error);
        setError("Sonuç yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '50vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} color="secondary" />
        <Typography variant="h6" color="text.secondary">
          Sonuç Yükleniyor...
        </Typography>
      </Box>
    );
  }

  if (!result) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: 2, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          p: 2
        }}
      >
        Sonuç bulunamadı.
      </Alert>
    );
  }

  // Soruları kategorilere ayır: doğru, yanlış ve boş
  const correctQuestions = result.questionAnswers.filter(qa => qa.isCorrect);
  const wrongQuestions = result.questionAnswers.filter(qa => !qa.isCorrect && qa.selectedAnswer !== null);
  const unansweredQuestions = result.questionAnswers.filter(qa => qa.selectedAnswer === null);
  
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <div>
      <AdBanner position="top" size="medium" />
      
      {/* Original Card content */}
      <Card sx={{ 
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}>
        {/* ... existing card content */}
        <Box sx={{ 
          p: 3, 
          background: `linear-gradient(135deg, ${
            isPassing ? theme.palette.secondary.dark : '#ef4444'
          } 0%, ${
            isPassing ? theme.palette.secondary.main : '#f87171'
          } 100%)`,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}>
          <Button 
            variant="contained"
            color="inherit"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ 
              position: 'absolute', 
              left: 16, 
              top: 16,
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
              }
            }}
          >
            Ana Sayfa
          </Button>
          
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'white', 
              color: isPassing ? theme.palette.secondary.main : '#ef4444',
              margin: '0 auto 16px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}
          >
            {isPassing ? <CheckCircleIcon fontSize="large" /> : <CloseIcon fontSize="large" />}
          </Avatar>
          
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            {isPassing ? 'Tebrikler!' : 'Sınav Tamamlandı'}
          </Typography>
          
          <Typography variant="h5" fontWeight="medium" sx={{ mb: 1 }}>
            {result.exam.title}
          </Typography>
          
          <Typography variant="h6" fontWeight="medium" sx={{ mb: 1 }}>
            Skorunuz: {result.score} / {result.totalQuestions} ({percentage}%)
          </Typography>
          
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {isPassing 
              ? 'Sınavı başarıyla tamamladınız!' 
              : 'Daha fazla pratik yaparak tekrar deneyebilirsiniz.'}
          </Typography>
          
          <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>
            Sınav Tarihi: {new Date(result.createdAt).toLocaleString()}
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          {/* ... existing content */}
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 4, mb: 4 }}>
        <AdBanner position="middle" size="large" />
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <AdBanner position="bottom" size="medium" />
      </Box>
    </div>
  );
};

export default ExamResultPage; 