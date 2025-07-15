import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Chip,
  Paper,
  useTheme,
  alpha,
  Avatar,
  Divider,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TimerIcon from '@mui/icons-material/Timer';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// i18n için gerekli import
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import { ExamMode } from '../components/ExamModeSelector';
import SchoolIcon from '@mui/icons-material/School';
import FeedbackForm from '../components/FeedbackForm';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import QuestionBookmark from '../components/QuestionBookmark';
import ExamSimulationFeatures from '../components/ExamSimulationFeatures';
import { FadeIn, ScaleIn, ButtonAnimation, CardAnimation, AnswerAnimation } from '../components/UIAnimations';

// Tipleri güncelleyelim
interface Question {
  id: number;
  question: string; // `text` yerine `question`
  options: string[];
  correct: number; // `correctAnswer` yerine `correct` (index olarak)
  explanation: string;
  category?: string; // Add category field for topic-based analysis
}

interface Exam {
  id: number;
  title: string;
  questions: Question[];
}

// Mock veri - API çalışmadığında kullanılacak
const mockExams: Record<number, Exam> = {
  1: {
    id: 1,
    title: 'Google Cloud Digital Leader',
    questions: [
      {
        id: 1,
        question: 'What is the primary advantage of cloud technology\'s scalability for businesses?',
        options: [
          'A) Fixed resource allocation that never changes', 
          'B) Ability to increase or decrease resources based on demand', 
          'C) Automatic deletion of unused data', 
          'D) Permanent storage of all business data'
        ],
        correct: 1,
        explanation: 'Scalability allows businesses to dynamically adjust resources up or down based on current needs, providing flexibility and cost optimization.',
        category: 'Cloud Fundamentals'
      },
      {
        id: 2,
        question: 'Which cloud deployment model provides the highest level of security control for sensitive data?',
        options: [
          'A) Public cloud', 
          'B) Private cloud', 
          'C) Hybrid cloud', 
          'D) Multi-cloud'
        ],
        correct: 1,
        explanation: 'Private cloud offers the highest level of security control as it\'s dedicated to a single organization and not shared with others.',
        category: 'Cloud Security'
      },
      {
        id: 3,
        question: 'What does \'lift and shift\' mean in cloud migration?',
        options: [
          'A) Moving applications to the cloud without modifying them', 
          'B) Completely rewriting applications for the cloud', 
          'C) Retiring old applications and building new ones', 
          'D) Moving only data to the cloud'
        ],
        correct: 0,
        explanation: 'Lift and shift (also known as rehost) means moving applications to the cloud with minimal or no changes to the application code.'
      },
      {
        id: 4,
        question: 'Which of the following is NOT a benefit of cloud technology?',
        options: [
          'A) Increased agility', 
          'B) Reduced total cost of ownership', 
          'C) Guaranteed 100% uptime', 
          'D) Enhanced collaboration'
        ],
        correct: 2,
        explanation: 'No cloud provider can guarantee 100% uptime. Cloud services typically offer high availability (99.9%+) but not absolute uptime guarantee.'
      },
      {
        id: 5,
        question: 'What is the primary difference between CapEx and OpEx in cloud computing?',
        options: [
          'A) CapEx is for software, OpEx is for hardware', 
          'B) CapEx involves upfront investment, OpEx involves ongoing operational costs', 
          'C) CapEx is cheaper than OpEx', 
          'D) There is no difference between them'
        ],
        correct: 1,
        explanation: 'CapEx (Capital Expenditure) requires large upfront investments in infrastructure, while OpEx (Operational Expenditure) involves paying for resources as you use them.'
      }
    ]
  },
  2: {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    questions: [
      {
        id: 1,
        question: 'Which AWS service is used to store objects?',
        options: [
          'A) Amazon EC2', 
          'B) Amazon S3', 
          'C) Amazon RDS', 
          'D) Amazon VPC'
        ],
        correct: 1,
        explanation: 'Amazon S3 (Simple Storage Service) is an object storage service that offers industry-leading scalability, data availability, security, and performance.'
      },
      {
        id: 2,
        question: 'Which AWS service provides a virtual server in the cloud?',
        options: [
          'A) Amazon S3', 
          'B) Amazon RDS', 
          'C) Amazon EC2', 
          'D) Amazon DynamoDB'
        ],
        correct: 2,
        explanation: 'Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud as virtual servers.'
      },
      {
        id: 3,
        question: 'What is the AWS shared responsibility model?',
        options: [
          'A) AWS is responsible for everything', 
          'B) The customer is responsible for everything', 
          'C) AWS is responsible for the security of the cloud, customers are responsible for security in the cloud', 
          'D) The responsibility varies by service'
        ],
        correct: 2,
        explanation: 'In the AWS shared responsibility model, AWS is responsible for security "of" the cloud (infrastructure), while customers are responsible for security "in" the cloud (data, configuration, etc.).'
      }
    ]
  },
  5: {
    id: 5,
    title: 'Google Cloud Generative AI Leader',
    questions: [
      {
        id: 1,
        question: 'What is the key difference between traditional machine learning and generative AI?',
        options: [
          'A) Traditional ML only works with structured data',
          'B) Generative AI creates new content, traditional ML makes predictions',
          'C) Traditional ML is faster than generative AI',
          'D) Generative AI requires less data than traditional ML'
        ],
        correct: 1,
        explanation: 'Generative AI creates new content, traditional ML makes predictions. While traditional machine learning models are primarily designed to make predictions based on patterns in existing data, generative AI models can create entirely new content that resembles the data they were trained on.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 2,
        question: 'Which type of machine learning approach is primarily used for training large language models?',
        options: [
          'A) Supervised learning',
          'B) Unsupervised learning',
          'C) Reinforcement learning',
          'D) Self-supervised learning'
        ],
        correct: 3,
        explanation: 'Self-supervised learning is primarily used for training large language models. This approach allows models to learn from vast amounts of unlabeled text data by predicting parts of the input from other parts, without requiring explicit human-labeled examples.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 3,
        question: 'What is a foundation model in the context of generative AI?',
        options: [
          'A) A model that only works with text',
          'B) A large pre-trained model that can be adapted for various tasks',
          'C) A model that requires minimal training data',
          'D) A model that cannot be customized'
        ],
        correct: 1,
        explanation: 'A foundation model is a large pre-trained model that can be adapted for various tasks. These models are trained on vast amounts of data and can be fine-tuned or adapted to perform specific tasks with relatively little additional training.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 4,
        question: 'What is the primary advantage of multimodal foundation models?',
        options: [
          'A) They are faster than single-modal models',
          'B) They can process and generate multiple types of data (text, images, audio)',
          'C) They require less computational power',
          'D) They are more secure than single-modal models'
        ],
        correct: 1,
        explanation: 'The primary advantage of multimodal foundation models is that they can process and generate multiple types of data, including text, images, and audio. This allows them to understand and create content across different modalities, enabling more versatile applications.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 5,
        question: 'What is prompt engineering?',
        options: [
          'A) Building AI models from scratch',
          'B) The practice of crafting inputs to get desired outputs from AI models',
          'C) Engineering the underlying model architecture',
          'D) Optimizing model training speed'
        ],
        correct: 1,
        explanation: 'Prompt engineering is the practice of crafting inputs to get desired outputs from AI models. It involves designing effective prompts that guide the model to produce the specific type of response or content that the user wants.',
        category: 'Techniques to improve gen AI model output'
      },
      {
        id: 6,
        question: 'Which factor is most important when choosing a foundation model for a business use case?',
        options: [
          'A) The model\'s popularity',
          'B) The model\'s alignment with business requirements and constraints',
          'C) The model\'s age',
          'D) The model\'s complexity'
        ],
        correct: 1,
        explanation: 'The most important factor when choosing a foundation model for a business use case is the model\'s alignment with business requirements and constraints. This includes considerations like the specific tasks the model needs to perform, data privacy requirements, computational resources available, and cost constraints.',
        category: 'Business strategies for a successful gen AI solution'
      },
      {
        id: 7,
        question: 'What is the main difference between structured and unstructured data?',
        options: [
          'A) Structured data is larger than unstructured data',
          'B) Structured data is organized in a predefined format, unstructured data is not',
          'C) Structured data is more valuable than unstructured data',
          'D) Structured data is newer than unstructured data'
        ],
        correct: 1,
        explanation: 'Structured data is organized in a predefined format (like databases or spreadsheets), while unstructured data lacks a specific format (like text documents, images, or videos). This fundamental difference affects how data is stored, processed, and analyzed.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 8,
        question: 'What is the difference between labeled and unlabeled data?',
        options: [
          'A) Labeled data has correct answers provided, unlabeled data does not',
          'B) Labeled data is more expensive than unlabeled data',
          'C) Labeled data is structured, unlabeled data is unstructured',
          'D) Labeled data is newer than unlabeled data'
        ],
        correct: 0,
        explanation: 'Labeled data has correct answers or tags provided, while unlabeled data does not. Labeled data is essential for supervised learning approaches, where models learn to make predictions based on examples with known outcomes.',
        category: 'Fundamentals of gen AI'
      },
      {
        id: 9,
        question: 'What is the primary strength of Google\'s Gemini model?',
        options: [
          'A) It only works with text',
          'B) It\'s a multimodal model that can understand and generate text, images, and code',
          'C) It\'s the smallest foundation model',
          'D) It only works with images'
        ],
        correct: 1,
        explanation: 'The primary strength of Google\'s Gemini model is that it\'s a multimodal model capable of understanding and generating text, images, and code. This versatility allows it to process and create content across different modalities, making it suitable for a wide range of applications.',
        category: 'Google Cloud\'s gen AI offerings'
      },
      {
        id: 10,
        question: 'What is Google\'s Imagen model specifically designed for?',
        options: [
          'A) Text generation',
          'B) Code generation',
          'C) Image generation and editing',
          'D) Video generation'
        ],
        correct: 2,
        explanation: 'Google\'s Imagen model is specifically designed for image generation and editing. It can create high-quality images from text descriptions and perform various image editing tasks.',
        category: 'Google Cloud\'s gen AI offerings'
      }
    ]
  }
};

const QuizPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(90 * 60); // 90 dakika (saniye cinsinden)
  const [totalExamTime] = useState<number>(90 * 60); // Total exam time in seconds
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'analysis'>('summary');
  const [examMode, setExamMode] = useState<ExamMode>('practice');
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [questionTimeSpent, setQuestionTimeSpent] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState<boolean>(false);
  // i18n hook'u
  const { t } = useTranslation();
  
  // Parse exam mode from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode') as ExamMode | null;
    if (mode && (mode === 'practice' || mode === 'real' || mode === 'topic')) {
      setExamMode(mode);
    }
  }, [location]);
  
  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        // Önce API'den veri çekmeyi dene
        const response = await fetch(`http://localhost:5001/exams/${examId}`);
        if (!response.ok) {
          throw new Error('Sınav yüklenirken bir sorun oluştu.');
        }
        const data = await response.json();
        setExam(data);
        setSelectedAnswers(new Array(data.questions.length).fill(null));
        setQuestionTimeSpent(new Array(data.questions.length).fill(0));
      } catch (error) {
        console.error('API hatası:', error);
        // API hatası durumunda mock veriyi kullan
        if (examId && mockExams[parseInt(examId)]) {
          const mockExam = mockExams[parseInt(examId)];
          setExam(mockExam);
          setSelectedAnswers(new Array(mockExam.questions.length).fill(null));
          setQuestionTimeSpent(new Array(mockExam.questions.length).fill(0));
          setError("Backend API'ye erişilemedi. Demo veriler gösteriliyor.");
        } else {
          setError("Sınav bulunamadı.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);
  
  // Süre sayacı
  useEffect(() => {
    if (loading || score !== null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
      
      // Update total time spent
      setTotalTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, score]);
  
  // Track time spent on current question
  useEffect(() => {
    // Reset the start time when changing questions
    setQuestionStartTime(Date.now());
    
    return () => {
      // When unmounting or changing questions, update the time spent
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      if (timeSpent > 0 && currentQuestionIndex >= 0) {
        const newQuestionTimeSpent = [...questionTimeSpent];
        newQuestionTimeSpent[currentQuestionIndex] += timeSpent;
        setQuestionTimeSpent(newQuestionTimeSpent);
      }
    };
  }, [currentQuestionIndex]);
  
  // Süreyi formatlama fonksiyonu
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newSelectedAnswers);
    
    // In practice mode, show explanation after selecting an answer
    if (examMode === 'practice' && !showExplanation) {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    // Update time spent on current question before moving to next
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const newQuestionTimeSpent = [...questionTimeSpent];
    newQuestionTimeSpent[currentQuestionIndex] += timeSpent;
    setQuestionTimeSpent(newQuestionTimeSpent);
    
    if (showExplanation) {
      setShowExplanation(false);
    }
    
    if (currentQuestionIndex < exam!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(Date.now());
    }
  };
  
  const handlePreviousQuestion = () => {
    // Update time spent on current question before moving to previous
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const newQuestionTimeSpent = [...questionTimeSpent];
    newQuestionTimeSpent[currentQuestionIndex] += timeSpent;
    setQuestionTimeSpent(newQuestionTimeSpent);
    
    if (showExplanation) {
      setShowExplanation(false);
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(Date.now());
    }
  };
  
  const handleFinishClick = () => {
    if (!exam) return;
    
    const unansweredCount = selectedAnswers.filter(answer => answer === null).length;
    if (unansweredCount > 0) {
      setIsFinishDialogOpen(true);
    } else {
      handleSubmit();
    }
  };
  
  const handleSubmit = async () => {
    if (!exam) return;
    
    // Update time spent on current question before submitting
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const finalQuestionTimeSpent = [...questionTimeSpent];
    finalQuestionTimeSpent[currentQuestionIndex] += timeSpent;
    setQuestionTimeSpent(finalQuestionTimeSpent);
    
    let newScore = 0;
    const questionAnswers: { questionId: number; selectedAnswer: string | null; isCorrect: boolean; timeSpent: number }[] = [];
    
    exam.questions.forEach((question, index) => {
      const correctAnswer = question.options[question.correct];
      const isCorrect = selectedAnswers[index] === correctAnswer;
      
      if (isCorrect) {
        newScore++;
      }
      
      questionAnswers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswers[index],
        isCorrect: isCorrect,
        timeSpent: finalQuestionTimeSpent[index]
      });
    });
    
    setScore(newScore);
    
    // Sınav sonuçlarını backend'e gönder
    try {
      const response = await fetch(`http://localhost:5001/exams/${examId}/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examId: parseInt(examId || '0'),
          score: newScore,
          totalQuestions: exam.questions.length,
          examMode: examMode,
          timeSpent: totalTimeSpent,
          questionAnswers: questionAnswers
        }),
      });
      
      if (!response.ok) {
        console.error('Sınav sonuçları kaydedilemedi:', await response.text());
      } else {
        const result = await response.json();
        console.log('Sınav sonuçları kaydedildi:', result);
        
        // Sonuç sayfasına yönlendirme yapmak için bir timeout kullanıyoruz
        // Bu, kullanıcının kısa bir süre sonuç ekranını görmesini sağlar
        setTimeout(() => {
          navigate(`/results/${result.id}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Sınav sonuçları gönderilirken hata oluştu:', error);
    }
  };

  // Sınav yükleniyor durumu
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          {t('common.loading')}
        </Typography>
      </Box>
    );
  }

  // Hata durumu
  if (error || !exam) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error || t('common.error')}
      </Alert>
    );
  }

  // Sınav sonuçları
  if (score !== null) {
    const theme = useTheme();
    const percentage = Math.round((score / exam.questions.length) * 100);
    const isPassing = percentage >= 70;
    
    // Soruları kategorilere ayır: doğru, yanlış ve boş
    const correctQuestions = exam.questions.filter((_, index) => 
      selectedAnswers[index] === exam.questions[index].options[exam.questions[index].correct]
    );
    
    const wrongQuestions = exam.questions.filter((_, index) => 
      selectedAnswers[index] !== null && 
      selectedAnswers[index] !== exam.questions[index].options[exam.questions[index].correct]
    );
    
    const unansweredQuestions = exam.questions.filter((_, index) => 
      selectedAnswers[index] === null
    );
    
    return (
      <div>
        <AdBanner position="top" size="medium" />
        
        <FadeIn>
          <Card sx={{ 
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          }}>
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
                {isPassing ? t('quiz.congratulations') : t('quiz.examCompleted')}
              </Typography>
              
              <Typography variant="h5" fontWeight="medium" sx={{ mb: 1 }}>
                {exam.title}
              </Typography>
              
              <Typography variant="h6" fontWeight="medium" sx={{ mb: 1 }}>
                {t('quiz.yourScore')}: {score} / {exam.questions.length} ({percentage}%)
              </Typography>
              
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {isPassing 
                  ? t('quiz.passedMessage')
                  : t('quiz.failedMessage')}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label={`${t('quiz.totalTime')}: ${formatTime(totalTimeSpent)}`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip 
                  icon={<DoneAllIcon />} 
                  label={`${t('quiz.examMode')}: ${examMode === 'practice' ? t('quiz.practice') : examMode === 'real' ? t('quiz.realExam') : t('quiz.topicBasedStudy')}`} 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Box>
            
            {/* Tab Seçimi */}
            <Box sx={{ 
              display: 'flex', 
              borderBottom: 1, 
              borderColor: 'divider',
              bgcolor: alpha(theme.palette.background.paper, 0.6),
            }}>
              <Button 
                variant={activeTab === 'summary' ? 'contained' : 'text'}
                onClick={() => setActiveTab('summary')}
                sx={{ 
                  flex: 1,
                  py: 1.5,
                  borderRadius: 0,
                  fontWeight: 600,
                  color: activeTab === 'summary' ? 'white' : 'text.primary',
                  bgcolor: activeTab === 'summary' ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: activeTab === 'summary' ? 'primary.dark' : alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                {t('quiz.summary')}
              </Button>
              <Button 
                variant={activeTab === 'analysis' ? 'contained' : 'text'}
                onClick={() => setActiveTab('analysis')}
                sx={{ 
                  flex: 1,
                  py: 1.5,
                  borderRadius: 0,
                  fontWeight: 600,
                  color: activeTab === 'analysis' ? 'white' : 'text.primary',
                  bgcolor: activeTab === 'analysis' ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: activeTab === 'analysis' ? 'primary.dark' : alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                {t('quiz.detailedAnalysis')}
              </Button>
            </Box>
            
            {activeTab === 'summary' ? (
              // Özet Tab İçeriği
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={4}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        borderRadius: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckCircleIcon color="secondary" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="secondary.main">
                        {score}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('quiz.correct')}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        bgcolor: alpha('#ef4444', 0.1),
                        borderRadius: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="#ef4444">
                        {wrongQuestions.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('quiz.wrong')}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <HelpOutlineIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        {unansweredQuestions.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {t('quiz.unanswered')}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="secondary"
                    onClick={() => window.location.reload()}
                    startIcon={<DoneAllIcon />}
                    sx={{ 
                      px: 3,
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    {t('quiz.tryAgain')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ px: 3 }}
                  >
                    {t('quiz.returnToHome')}
                  </Button>
                </Box>
              </CardContent>
            ) : (
              // Detaylı Analiz Tab İçeriği
              <CardContent sx={{ p: 4 }}>
                {/* Yanlış Cevaplanan Sorular */}
                {wrongQuestions.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 1,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}>
                      <Box 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: alpha('#ef4444', 0.1),
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">✕</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {t('quiz.wrongQuestions')} ({wrongQuestions.length})
                      </Typography>
                    </Box>
                    
                    {wrongQuestions.map((question, index) => {
                      const questionIndex = exam.questions.findIndex(q => q.id === question.id);
                      const userAnswer = selectedAnswers[questionIndex];
                      const correctAnswer = question.options[question.correct];
                      
                      return (
                        <Paper
                          key={`wrong-${question.id}`}
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                            bgcolor: alpha(theme.palette.background.paper, 0.5),
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {t('quiz.question')} {questionIndex + 1}: {question.question}
                          </Typography>
                          
                          <Box sx={{ mt: 2, mb: 2 }}>
                            {question.options.map((option, optIndex) => (
                              <Box
                                key={optIndex}
                                sx={{
                                  p: 1.5,
                                  mb: 1,
                                  borderRadius: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  bgcolor: option === correctAnswer 
                                    ? alpha(theme.palette.success.main, 0.1)
                                    : option === userAnswer
                                      ? alpha(theme.palette.error.main, 0.1)
                                      : 'transparent',
                                  border: '1px solid',
                                  borderColor: option === correctAnswer 
                                    ? theme.palette.success.main
                                    : option === userAnswer
                                      ? theme.palette.error.main
                                      : alpha(theme.palette.divider, 0.3),
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1.5,
                                    bgcolor: option === correctAnswer 
                                      ? theme.palette.success.main
                                      : option === userAnswer
                                        ? theme.palette.error.main
                                        : alpha(theme.palette.action.selected, 0.2),
                                    color: option === correctAnswer || option === userAnswer ? 'white' : 'text.secondary',
                                  }}
                                >
                                  {option === correctAnswer ? (
                                    <CheckIcon fontSize="small" />
                                  ) : option === userAnswer ? (
                                    <CloseIcon fontSize="small" />
                                  ) : (
                                    String.fromCharCode(65 + optIndex)
                                  )}
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: option === correctAnswer 
                                      ? 'success.main'
                                      : option === userAnswer
                                        ? 'error.main'
                                        : 'text.primary',
                                    fontWeight: option === correctAnswer || option === userAnswer ? 500 : 400,
                                  }}
                                >
                                  {option}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          
                          <Box sx={{ 
                            mt: 2, 
                            p: 2, 
                            bgcolor: alpha(theme.palette.info.main, 0.05),
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                          }}>
                            <Typography variant="subtitle2" color="info.main" fontWeight="bold" gutterBottom>
                              {t('quiz.explanation')}:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {question.explanation}
                            </Typography>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Box>
                )}
                
                {/* Boş Bırakılan Sorular */}
                {unansweredQuestions.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 1,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}>
                      <Box 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <HelpOutlineIcon fontSize="small" />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {t('quiz.unansweredQuestions')} ({unansweredQuestions.length})
                      </Typography>
                    </Box>
                    
                    {unansweredQuestions.map((question) => {
                      const questionIndex = exam.questions.findIndex(q => q.id === question.id);
                      const correctAnswer = question.options[question.correct];
                      
                      return (
                        <Paper
                          key={`unanswered-${question.id}`}
                          elevation={0}
                          sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                            bgcolor: alpha(theme.palette.background.paper, 0.5),
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {t('quiz.question')} {questionIndex + 1}: {question.question}
                          </Typography>
                          
                          <Box sx={{ mt: 2, mb: 2 }}>
                            {question.options.map((option, optIndex) => (
                              <Box
                                key={optIndex}
                                sx={{
                                  p: 1.5,
                                  mb: 1,
                                  borderRadius: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  bgcolor: option === correctAnswer 
                                    ? alpha(theme.palette.success.main, 0.1)
                                    : 'transparent',
                                  border: '1px solid',
                                  borderColor: option === correctAnswer 
                                    ? theme.palette.success.main
                                    : alpha(theme.palette.divider, 0.3),
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1.5,
                                    bgcolor: option === correctAnswer 
                                      ? theme.palette.success.main
                                      : alpha(theme.palette.action.selected, 0.2),
                                    color: option === correctAnswer ? 'white' : 'text.secondary',
                                  }}
                                >
                                  {option === correctAnswer ? (
                                    <CheckIcon fontSize="small" />
                                  ) : (
                                    String.fromCharCode(65 + optIndex)
                                  )}
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: option === correctAnswer ? 'success.main' : 'text.primary',
                                    fontWeight: option === correctAnswer ? 500 : 400,
                                  }}
                                >
                                  {option}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          
                          <Box sx={{ 
                            mt: 2, 
                            p: 2, 
                            bgcolor: alpha(theme.palette.info.main, 0.05),
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                          }}>
                            <Typography variant="subtitle2" color="info.main" fontWeight="bold" gutterBottom>
                              {t('quiz.explanation')}:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {question.explanation}
                            </Typography>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Box>
                )}
                
                {/* Doğru Cevaplanan Sorular */}
                {correctQuestions.length > 0 && (
                  <Box>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 1,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    }}>
                      <Box 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: alpha(theme.palette.success.main, 0.1),
                          color: theme.palette.success.main,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2
                        }}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        {t('quiz.correctQuestions')} ({correctQuestions.length})
                      </Typography>
                    </Box>
                    
                    {/* Doğru cevapların özet listesi */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.success.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {t('quiz.congratulations')} {t('quiz.youAnsweredCorrectly')}:
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {correctQuestions.map((question) => {
                          const questionIndex = exam.questions.findIndex(q => q.id === question.id);
                          return (
                            <Chip 
                              key={`correct-${question.id}`}
                              label={`${t('quiz.question')} ${questionIndex + 1}`}
                              size="small"
                              color="success"
                              variant="outlined"
                              icon={<CheckIcon />}
                            />
                          );
                        })}
                      </Box>
                    </Paper>
                  </Box>
                )}
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="secondary"
                    onClick={() => window.location.reload()}
                    startIcon={<DoneAllIcon />}
                    sx={{ 
                      px: 3,
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                    }}
                  >
                    {t('quiz.tryAgain')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ px: 3 }}
                  >
                    {t('quiz.returnToHome')}
                  </Button>
                </Box>
              </CardContent>
            )}
          </Card>
        </FadeIn>
        
        <Box sx={{ mt: 4, mb: 4 }}>
          <AdBanner position="middle" size="large" />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <AdBanner position="bottom" size="medium" />
        </Box>
      </div>
    );
  }

  // Mevcut soru
  const currentQuestion = exam.questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== null;
  const isCorrect = isAnswered && selectedAnswers[currentQuestionIndex] === currentQuestion.options[currentQuestion.correct];
  const showCurrentExplanation = showExplanation && examMode === 'practice';
  
  const handleFeedbackOpen = () => {
    setIsFeedbackDialogOpen(true);
  };
  
  const handleFeedbackClose = () => {
    setIsFeedbackDialogOpen(false);
  };
  
  return (
    <div>
      <AdBanner position="top" size="medium" />
      
      <Box sx={{ mb: 2, maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
          {exam.title}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2
        }}>
          {/* Replace the simple Chip with ExamSimulationFeatures */}
          <ExamSimulationFeatures 
            timeRemaining={timeRemaining}
            totalTime={totalExamTime}
            examMode={examMode}
            onTimeUp={handleSubmit}
          />
          
          <Box>
            <Chip 
              label={`${t('quiz.question')} ${currentQuestionIndex + 1} / ${exam.questions.length}`} 
              sx={{ mr: 1 }} 
            />
            
            <Chip 
              icon={examMode === 'practice' ? <SchoolIcon /> : examMode === 'real' ? <TimerIcon /> : <HelpOutlineIcon />}
              label={`${examMode === 'practice' ? t('quiz.practiceMode') : examMode === 'real' ? t('quiz.realExamMode') : t('quiz.topicBasedStudy')}`}
              color="secondary"
            />
          </Box>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestionIndex / exam.questions.length) * 100} 
          sx={{ height: 8, borderRadius: 4, mb: 3 }}
        />
      </Box>
      
      <ScaleIn>
        <CardAnimation>
          <Card sx={{ mb: 4, borderRadius: 2, maxWidth: "1000px", width: "100%", mx: "auto" }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1rem', flex: 1, mr: 2 }}>
                  {currentQuestion.question}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {/* Add QuestionBookmark component */}
                  <QuestionBookmark 
                    examId={exam.id} 
                    questionId={currentQuestion.id} 
                    questionText={currentQuestion.question} 
                  />
                  
                  <Button
                    size="small"
                    startIcon={<ReportProblemIcon />}
                    onClick={handleFeedbackOpen}
                    sx={{ ml: 2, minWidth: 'auto' }}
                  >
                    {t('quiz.reportError')}
                  </Button>
                </Box>
              </Box>
              
              {currentQuestion.category && (
                <Chip 
                  label={currentQuestion.category} 
                  size="small" 
                  sx={{ mb: 2 }} 
                  color="primary" 
                  variant="outlined"
                />
              )}
              
              <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                <RadioGroup
                  value={selectedAnswers[currentQuestionIndex] || ''}
                  onChange={handleAnswerSelect}
                >
                  {currentQuestion.options.map((option, index) => {
                    // Determine if this option is correct or incorrect
                    const isThisOptionCorrect = index === currentQuestion.correct;
                    const isThisOptionSelected = selectedAnswers[currentQuestionIndex] === option;
                    
                    // Only show correct/incorrect styling in practice mode and after selection
                    const showResult = examMode === 'practice' && isAnswered;
                    
                    return (
                      <AnswerAnimation 
                        key={index}
                        isCorrect={showResult ? (isThisOptionSelected ? isThisOptionCorrect : null) : null}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio size="small" />}
                          label={<Typography variant="body2" sx={{ fontSize: '0.95rem' }}>{option}</Typography>}
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            mb: 1,
                            width: '100%',
                            ...(showResult && {
                              bgcolor: isThisOptionSelected ? (
                                isThisOptionCorrect ? alpha('#4caf50', 0.1) : alpha('#f44336', 0.1)
                              ) : (
                                isThisOptionCorrect ? alpha('#4caf50', 0.05) : 'transparent'
                              ),
                              border: isThisOptionSelected ? (
                                isThisOptionCorrect ? '1px solid #4caf50' : '1px solid #f44336'
                              ) : (
                                isThisOptionCorrect ? '1px solid #4caf50' : '1px solid transparent'
                              ),
                            })
                          }}
                        />
                      </AnswerAnimation>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              
              {showCurrentExplanation && (
                <FadeIn direction="up">
                  <Paper sx={{ 
                    p: 2, 
                    mt: 3, 
                    bgcolor: isCorrect ? alpha('#4caf50', 0.05) : alpha('#f44336', 0.05),
                    border: isCorrect ? '1px solid #4caf50' : '1px solid #f44336',
                    borderRadius: 2
                  }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                      {isCorrect ? (
                        <>
                          <CheckIcon color="success" sx={{ mr: 1 }} />
                          {t('quiz.correctAnswer')}
                        </>
                      ) : (
                        <>
                          <CloseIcon color="error" sx={{ mr: 1 }} />
                          {t('quiz.wrongAnswer')}
                        </>
                      )}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem' }}>
                      <strong>{t('quiz.explanation')}:</strong> {currentQuestion.explanation}
                    </Typography>
                    
                    {!isCorrect && (
                      <Typography variant="body2" sx={{ mt: 1, fontSize: '0.85rem' }}>
                        <strong>{t('quiz.correctAnswer')}:</strong> {currentQuestion.options[currentQuestion.correct]}
                      </Typography>
                    )}
                  </Paper>
                </FadeIn>
              )}
            </CardContent>
            
            <Divider />
            
            <CardActions sx={{ p: 2, justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <ButtonAnimation>
                <Button
                  variant="outlined"
                  startIcon={<NavigateBeforeIcon />}
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  sx={{ mb: { xs: 1, sm: 0 } }}
                >
                  {t('quiz.previous')}
                </Button>
              </ButtonAnimation>
              
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'flex-end' }}>
                {examMode === 'practice' && !showExplanation && (
                  <ButtonAnimation>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowExplanation(true)}
                      disabled={!isAnswered}
                      size="medium"
                    >
                      {t('quiz.explanation')}
                    </Button>
                  </ButtonAnimation>
                )}
                
                <ButtonAnimation>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DoneAllIcon />}
                    onClick={handleFinishClick}
                    size="medium"
                  >
                    {t('quiz.finishExam')}
                  </Button>
                </ButtonAnimation>
                
                <ButtonAnimation>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === exam.questions.length - 1}
                    size="medium"
                  >
                    {t('quiz.next')}
                  </Button>
                </ButtonAnimation>
              </Box>
            </CardActions>
          </Card>
        </CardAnimation>
      </ScaleIn>
      
      <Dialog
        open={isFinishDialogOpen}
        onClose={() => setIsFinishDialogOpen(false)}
      >
        <DialogTitle>{t('quiz.confirmFinish.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('quiz.confirmFinish.message', { unanswered: selectedAnswers.filter(answer => answer === null).length })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFinishDialogOpen(false)} color="primary">
            {t('quiz.confirmFinish.cancel')}
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {t('quiz.confirmFinish.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={isFeedbackDialogOpen}
        onClose={handleFeedbackClose}
        maxWidth="md"
        fullWidth
      >
        <FeedbackForm 
          examId={exam.id} 
          questionId={currentQuestion.id} 
          onClose={handleFeedbackClose} 
        />
      </Dialog>
      
      <AdBanner position="bottom" size="medium" />
    </div>
  );
};

export default QuizPage; 