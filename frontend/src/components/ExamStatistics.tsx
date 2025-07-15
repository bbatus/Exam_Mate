import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  useTheme,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

interface CategoryPerformance {
  [category: string]: {
    total: number;
    correct: number;
    percentage: number;
  };
}

interface TimeBasedPerformance {
  date: string;
  score: number;
  timeSpent: number;
}

interface WrongAnswer {
  answer: string;
  count: number;
}

interface WrongAnswerPattern {
  questionId: number;
  question: string;
  totalWrong: number;
  wrongAnswers: WrongAnswer[];
}

interface ExamStatistics {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  averageTimeSpent: number;
  categoryPerformance: CategoryPerformance;
  timeBasedPerformance: TimeBasedPerformance[];
  wrongAnswerPatterns: WrongAnswerPattern[];
}

interface ExamStatisticsProps {
  examId: number;
}

const ExamStatistics: React.FC<ExamStatisticsProps> = ({ examId }) => {
  const [statistics, setStatistics] = useState<ExamStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/exams/${examId}/statistics`);
        if (!response.ok) {
          throw new Error('İstatistikler yüklenirken bir sorun oluştu.');
        }
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error('API hatası:', error);
        setError("İstatistikler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [examId]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !statistics) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error || "İstatistikler bulunamadı."}
      </Alert>
    );
  }

  // If no attempts yet
  if (statistics.totalAttempts === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Henüz hiç sınav denemesi bulunmuyor. İstatistikler için en az bir sınav tamamlamanız gerekiyor.
      </Alert>
    );
  }

  // Format time in minutes and seconds
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} dk ${remainingSeconds} sn`;
  };

  // Prepare data for time-based performance chart
  const timePerformanceData = {
    labels: statistics.timeBasedPerformance.map(item => 
      new Date(item.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })
    ),
    datasets: [
      {
        label: 'Skor (%)',
        data: statistics.timeBasedPerformance.map(item => item.score),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        yAxisID: 'y',
      },
      {
        label: 'Harcanan Süre (dk)',
        data: statistics.timeBasedPerformance.map(item => item.timeSpent / 60), // Convert to minutes
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: 'y1',
      }
    ],
  };

  // Prepare data for category performance chart
  const categoryLabels = Object.keys(statistics.categoryPerformance);
  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Başarı Oranı (%)',
        data: categoryLabels.map(category => statistics.categoryPerformance[category].percentage),
        backgroundColor: categoryLabels.map((_, index) => 
          `hsl(${index * (360 / categoryLabels.length)}, 70%, 60%)`
        ),
        borderWidth: 1,
      }
    ],
  };

  // Prepare data for wrong answer patterns pie chart
  const wrongAnswerData = {
    labels: statistics.wrongAnswerPatterns.slice(0, 5).map(pattern => 
      pattern.question.length > 30 ? pattern.question.substring(0, 30) + '...' : pattern.question
    ),
    datasets: [
      {
        data: statistics.wrongAnswerPatterns.slice(0, 5).map(pattern => pattern.totalWrong),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
        <AssessmentIcon sx={{ mr: 1 }} />
        Sınav İstatistikleri
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Toplam Deneme</Typography>
              <Typography variant="h4" fontWeight="bold">{statistics.totalAttempts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Ortalama Skor</Typography>
              <Typography variant="h4" fontWeight="bold">{Math.round(statistics.averageScore)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">En Yüksek Skor</Typography>
              <Typography variant="h4" fontWeight="bold">{Math.round(statistics.bestScore)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2} sx={{ borderRadius: 2, height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Ortalama Süre</Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatTime(statistics.averageTimeSpent)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<TimerIcon />} 
            label="Zaman Bazlı Performans" 
            id="tab-0"
            aria-controls="tabpanel-0"
          />
          <Tab 
            icon={<CategoryIcon />} 
            label="Kategori Bazlı Analiz" 
            id="tab-1"
            aria-controls="tabpanel-1"
          />
          <Tab 
            icon={<ErrorOutlineIcon />} 
            label="Yanlış Cevap Analizi" 
            id="tab-2"
            aria-controls="tabpanel-2"
          />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Time-based Performance Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>Zaman İçinde Performans</Typography>
              <Box sx={{ height: 400, mt: 2 }}>
                <Line 
                  data={timePerformanceData}
                  options={{
                    responsive: true,
                    interaction: {
                      mode: 'index' as const,
                      intersect: false,
                    },
                    scales: {
                      y: {
                        type: 'linear' as const,
                        display: true,
                        position: 'left' as const,
                        title: {
                          display: true,
                          text: 'Skor (%)'
                        },
                        min: 0,
                        max: 100,
                      },
                      y1: {
                        type: 'linear' as const,
                        display: true,
                        position: 'right' as const,
                        title: {
                          display: true,
                          text: 'Süre (dk)'
                        },
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          )}
          
          {/* Category Performance Tab */}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Kategori Bazlı Performans</Typography>
              <Box sx={{ height: 400, mt: 2 }}>
                <Bar 
                  data={categoryData}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Başarı Oranı (%)'
                        }
                      }
                    }
                  }}
                />
              </Box>
              
              <TableContainer sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Kategori</TableCell>
                      <TableCell align="center">Toplam Soru</TableCell>
                      <TableCell align="center">Doğru</TableCell>
                      <TableCell align="center">Başarı Oranı</TableCell>
                      <TableCell align="right">Performans</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(statistics.categoryPerformance).map(([category, data]) => (
                      <TableRow key={category}>
                        <TableCell component="th" scope="row">{category}</TableCell>
                        <TableCell align="center">{data.total}</TableCell>
                        <TableCell align="center">{data.correct}</TableCell>
                        <TableCell align="center">{Math.round(data.percentage)}%</TableCell>
                        <TableCell align="right" sx={{ width: '20%' }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={data.percentage} 
                            color={data.percentage >= 70 ? "success" : data.percentage >= 50 ? "warning" : "error"}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {/* Wrong Answer Patterns Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>En Çok Yanlış Yapılan Sorular</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Pie 
                      data={wrongAnswerData}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom' as const,
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={7}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Soru</TableCell>
                          <TableCell align="center">Yanlış Sayısı</TableCell>
                          <TableCell>En Çok Seçilen Yanlış Cevap</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {statistics.wrongAnswerPatterns.slice(0, 5).map((pattern) => (
                          <TableRow key={pattern.questionId}>
                            <TableCell>
                              {pattern.question.length > 50 
                                ? pattern.question.substring(0, 50) + '...' 
                                : pattern.question}
                            </TableCell>
                            <TableCell align="center">{pattern.totalWrong}</TableCell>
                            <TableCell>
                              {pattern.wrongAnswers.length > 0 
                                ? pattern.wrongAnswers[0].answer.length > 30
                                  ? pattern.wrongAnswers[0].answer.substring(0, 30) + '...'
                                  : pattern.wrongAnswers[0].answer
                                : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ExamStatistics; 