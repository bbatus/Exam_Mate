import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Chip,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material';
import { HeroBanner } from '@/components/SparklesPreview';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { getTranslatedExamTitle } from '@/lib/utils/examTitleUtils';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListIcon from '@mui/icons-material/List';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import Advertisement from '../components/Advertisement';
import ExamStatistics from '../components/ExamStatistics';
import ExamModeSelector, { ExamMode } from '../components/ExamModeSelector';
import PageLayout from '../components/PageLayout';
import { fetchApi } from '../lib/apiConfig';

// Visual Enhancement Components
import AnimatedBackground from '../components/visual/AnimatedBackground';
import FloatingIcons from '../components/visual/FloatingIcons';
import ParticleSystem from '../components/visual/ParticleSystem';
import FeatureCards from '../components/visual/FeatureCards';

interface Exam {
  id: number;
  title: string;
}

// Mock veri - API çalışmadığında kullanılacak
const mockExams: Exam[] = [
  { id: 1, title: 'Google Cloud Digital Leader' },
  { id: 2, title: 'AWS Certified Cloud Practitioner' },
  { id: 3, title: 'Microsoft Azure Fundamentals' },
  { id: 4, title: 'Google Cloud Associate Cloud Engineer' },
  { id: 5, title: 'Google Cloud Generative AI Leader' }
];

// Mock kategoriler - Mevcut sınavlara göre güncellendi
const getCategoryKeys = () => ['cloudComputing', 'containerOrchestration', 'languageLearning', 'artificialIntelligence'];
const getDifficultyKeys = () => ['all', 'beginner', 'intermediate', 'advanced'];

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examMode, setExamMode] = useState<ExamMode>('practice');
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Önce API'den veri çekmeyi dene
        const response = await fetchApi('/exams');
        if (!response.ok) {
          throw new Error('Sınavlar yüklenirken bir sorun oluştu.');
        }
        const data = await response.json();
        setExams(data);
        setFilteredExams(data);
      } catch (error) {
        console.error('API hatası:', error);
        // API hatası durumunda mock verileri kullan
        setExams(mockExams);
        setFilteredExams(mockExams);
        setError("Backend API'ye erişilemedi. Demo veriler gösteriliyor.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Filtreleme işlevi
  useEffect(() => {
    let result = [...exams];
    
    // Arama sorgusuna göre filtrele
    if (searchQuery) {
      result = result.filter(exam => {
        const originalTitle = exam.title.toLowerCase();
        const translatedTitle = getTranslatedExamTitle(exam.title, t).toLowerCase();
        const query = searchQuery.toLowerCase();
        return originalTitle.includes(query) || translatedTitle.includes(query);
      });
    }
    
    // Kategori filtreleme - Gerçek sınavlara göre güncellendi
    if (categoryFilter) {
      result = result.filter(exam => {
        // Bulut Bilişim: Google Cloud, AWS sınavları
        if (categoryFilter === 'cloudComputing') {
          return [1, 2, 3, 21].includes(exam.id); // GCP Digital Leader, GCP GenAI, GCP Associate, AWS
        }
        // Container & Orchestration: Kubernetes sınavları
        if (categoryFilter === 'containerOrchestration') {
          return [5, 16].includes(exam.id); // Kubernetes, Kubernetes Orta Seviye
        }
        // Dil Öğrenimi: İngilizce sınavları
        if (categoryFilter === 'languageLearning') {
          return [17, 18, 19, 20].includes(exam.id); // English A1, A2, B1, B2
        }
        // Yapay Zeka: AI/ML sınavları
        if (categoryFilter === 'artificialIntelligence') {
          return [2].includes(exam.id); // GCP Generative AI Leader
        }
        return true;
      });
    }
    
    // Zorluk seviyesi filtreleme - Gerçek sınav zorluklarına göre
    if (difficultyFilter !== 'all') {
      result = result.filter(exam => {
        const difficulty = getExamDifficultyKey(exam.id);
        return difficulty === difficultyFilter;
      });
    }
    
    setFilteredExams(result);
  }, [searchQuery, categoryFilter, difficultyFilter, exams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  const handleExamSelect = (examId: number) => {
    setSelectedExamId(examId);
    setActiveTab(1); // Switch to statistics tab
  };
  
  const handleExamModeChange = (mode: ExamMode) => {
    setExamMode(mode);
  };

  if (loading) {
    return (
      <PageLayout>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
          gap: 2
        }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            {t('examList.loading')}
          </Typography>
        </Box>
      </PageLayout>
    );
  }

  // Rastgele renk ve ikon atamaları için yardımcı fonksiyonlar
  const getRandomColor = (index: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      '#8b5cf6', // Purple
      '#ec4899', // Pink
      '#f59e0b', // Amber
    ];
    return colors[index % colors.length];
  };

  const getExamDifficultyKey = (examId: number) => {
    // Gerçek sınav zorluk seviyeleri - translation key'leri
    const difficultyMap: Record<number, string> = {
      1: 'beginner',   // Google Cloud Digital Leader
      2: 'intermediate',        // Google Cloud Generative AI Leader
      3: 'advanced',       // Google Cloud Associate Engineer
      5: 'beginner',   // Kubernetes
      16: 'intermediate',       // Kubernetes Orta Seviye
      17: 'beginner',  // English A1
      18: 'beginner',  // English A2
      19: 'intermediate',       // English B1
      20: 'intermediate',       // English B2
      21: 'beginner',  // AWS Cloud Practitioner
      22: 'beginner'   // test
    };
    return difficultyMap[examId] || 'beginner';
  };

  const getExamDifficulty = (examId: number) => {
    const difficultyKey = getExamDifficultyKey(examId);
    return t(`examList.difficulties.${difficultyKey}`);
  };

  const getRandomQuestionCount = (index: number) => {
    const counts = [20, 30, 50, 65];
    return counts[index % counts.length];
  };

  return (
    <PageLayout>
      {/* Visual Enhancement Components */}
      <AnimatedBackground />
      <FloatingIcons />
      <ParticleSystem />
      
      <HeroBanner />
      
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 4,
          '& .MuiTab-root': {
            py: 2,
          },
        }}
      >
        <Tab 
          icon={<ListIcon />} 
          label={t('examList.tabExams')} 
          iconPosition="start"
        />
        {selectedExamId && (
          <Tab 
            icon={<AssessmentIcon />} 
            label={t('examList.tabStatistics')} 
            iconPosition="start" 
          />
        )}
      </Tabs>

      {activeTab === 0 ? (
        <>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {t('examList.filterTitle')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label={t('examList.searchLabel')}
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="category-select-label">
                    {t('examList.categoryLabel')}
                  </InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={categoryFilter}
                    label={t('examList.categoryLabel')}
                    onChange={handleCategoryChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">
                      {t('examList.allCategories')}
                    </MenuItem>
                    {getCategoryKeys().map((categoryKey: string) => (
                      <MenuItem key={categoryKey} value={categoryKey}>
                        {t(`examList.categories.${categoryKey}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="difficulty-select-label">
                    {t('examList.difficultyLabel')}
                  </InputLabel>
                  <Select
                    labelId="difficulty-select-label"
                    value={difficultyFilter}
                    label={t('examList.difficultyLabel')}
                    onChange={handleDifficultyChange}
                  >
                    {getDifficultyKeys().map((difficultyKey: string) => (
                      <MenuItem key={difficultyKey} value={difficultyKey}>
                        {t(`examList.difficulties.${difficultyKey}`)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <ExamModeSelector 
            selectedMode={examMode} 
            onModeChange={handleExamModeChange}
          />

          {/* Feature Cards Section */}
          <FeatureCards />

          {error && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {filteredExams.map((exam, index) => {
              // Add an advertisement after every 3rd exam card
              const shouldShowAd = index > 0 && index % 3 === 0;
              
              return (
                <React.Fragment key={exam.id}>
                  {shouldShowAd && (
                    <Grid item xs={12}>
                      <Advertisement 
                        position="middle" 
                        style={{ marginBottom: 2, marginTop: 2 }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: `0 12px 20px -10px ${alpha(getRandomColor(index), 0.4)}`,
                        },
                      }}
                    >
                      <Box 
                        sx={{ 
                          bgcolor: alpha(getRandomColor(index), 0.1),
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: getRandomColor(index),
                            width: 48,
                            height: 48,
                          }}
                        >
                          <SchoolIcon />
                        </Avatar>
                        <Box sx={{ ml: 2 }}>
                          <Chip 
                            label={getExamDifficulty(exam.id)} 
                            size="small"
                            sx={{ 
                              bgcolor: alpha(getRandomColor(index), 0.2),
                              color: getRandomColor(index),
                              fontWeight: 500,
                            }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            {getRandomQuestionCount(index)} {t('examList.questions')}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {getTranslatedExamTitle(exam.title, t)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          component={RouterLink}
                          to={`/quiz/${exam.id}?mode=${examMode}`}
                          variant="contained"
                          startIcon={<PlayArrowIcon />}
                          fullWidth
                          sx={{
                            background: `linear-gradient(45deg, ${getRandomColor(index)}, ${alpha(getRandomColor(index), 0.8)})`,
                            boxShadow: `0 4px 10px ${alpha(getRandomColor(index), 0.4)}`,
                          }}
                        >
                          {t('examList.startExam')}
                        </Button>
                      </CardActions>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button 
                          variant="text" 
                          fullWidth
                          onClick={() => handleExamSelect(exam.id)}
                          sx={{ color: getRandomColor(index) }}
                        >
                          {t('examList.viewStatistics')}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>

          {filteredExams.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {t('examList.noResults')}
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <ExamStatistics examId={selectedExamId || 1} />
      )}
      
      <Advertisement position="bottom" />
    </PageLayout>
  );
};

export default ExamListPage; 