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
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListIcon from '@mui/icons-material/List';
import { useTranslation } from 'react-i18next';
import AdBanner from '../components/AdBanner';
import ExamStatistics from '../components/ExamStatistics';
import ExamModeSelector, { ExamMode } from '../components/ExamModeSelector';
import PageLayout from '../components/PageLayout';

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

// Mock kategoriler
const categories = ['Bulut Bilişim', 'DevOps', 'Güvenlik', 'Yazılım Geliştirme', 'Veri Bilimi', 'Yapay Zeka'];
const difficulties = ['Tümü', 'Başlangıç', 'Orta', 'İleri'];

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('Tümü');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examMode, setExamMode] = useState<ExamMode>('practice');
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Önce API'den veri çekmeyi dene
        const response = await fetch('http://localhost:5001/exams');
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
      result = result.filter(exam => 
        exam.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Kategori filtreleme (mock olarak sadece bazı ID'lere kategori atayacağız)
    if (categoryFilter) {
      // Gerçek uygulamada burada API'den gelen kategori bilgisine göre filtreleme yapılır
      // Şimdilik mock olarak çift ID'li sınavları seçilen kategoriye ait kabul edelim
      result = result.filter(exam => {
        if (categoryFilter === 'Bulut Bilişim') return exam.id % 2 === 0;
        if (categoryFilter === 'DevOps') return exam.id % 3 === 0;
        if (categoryFilter === 'Güvenlik') return exam.id % 5 === 0;
        return true;
      });
    }
    
    // Zorluk seviyesi filtreleme (mock olarak ID'ye göre zorluk atayacağız)
    if (difficultyFilter !== 'Tümü') {
      result = result.filter(exam => {
        const difficulty = getRandomDifficulty(exam.id - 1);
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

  const getRandomDifficulty = (index: number) => {
    const difficulties = ['Başlangıç', 'Orta', 'İleri'];
    return difficulties[index % difficulties.length];
  };

  const getRandomQuestionCount = (index: number) => {
    const counts = [20, 30, 50, 65];
    return counts[index % counts.length];
  };

  return (
    <PageLayout>
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
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
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
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>
                        {difficulty}
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

          {error && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {filteredExams.map((exam, index) => (
              <Grid item xs={12} sm={6} md={4} key={exam.id}>
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
                        label={getRandomDifficulty(index)} 
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
                      {exam.title}
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
            ))}
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
      
      {/* Admin Panel Link */}
      <Box sx={{ mt: 4, textAlign: 'center', opacity: 0.7 }}>
        <Button 
          component={RouterLink} 
          to="/admin/login" 
          variant="text" 
          size="small"
          sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
        >
          {t('admin.login.title')}
        </Button>
      </Box>
      
      <AdBanner position="bottom" size="large" />
    </PageLayout>
  );
};

export default ExamListPage; 