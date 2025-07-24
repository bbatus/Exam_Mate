import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  alpha,
  Tabs,
  Tab,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { FadeIn } from './UIAnimations';
import { useTranslation } from 'react-i18next';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

interface StudyAnalyticsProps {
  userId?: string;
}

const StudyAnalyticsSimple: React.FC<StudyAnalyticsProps> = ({ userId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const theme = useTheme();
  const { t } = useTranslation();

  // Mock analytics data
  const analyticsData = {
    totalStudyTime: 2120, // in minutes
    totalSessions: 28,
    averageScore: 74.2,
    strongestTopic: 'Cloud Fundamentals',
    weakestTopic: 'Cloud Security',
    mostProductiveDay: 'Saturday'
  };

  // Generate mock data for charts
  const generateChartData = () => {
    // Progress over time data
    const progressData = {
      labels: ['1 Hf Önce', '6 Gün Önce', '5 Gün Önce', '4 Gün Önce', '3 Gün Önce', '2 Gün Önce', 'Dün', 'Bugün'],
      datasets: [
        {
          label: 'Doğruluk Oranı (%)',
          data: [65, 72, 68, 75, 80, 78, 82, 85],
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Çalışma Süresi (dk)',
          data: [45, 60, 35, 80, 90, 65, 75, 85],
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          tension: 0.4,
          fill: true,
        }
      ]
    };

    // Topic performance data
    const topicData = {
      labels: ['Cloud Fundamentals', 'Cloud Security', 'Cloud Economics', 'Kubernetes', 'AI/ML', 'English'],
      datasets: [{
        label: 'Performans (%)',
        data: [85, 65, 78, 72, 68, 80],
        backgroundColor: [
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.error.main, 0.8),
          alpha(theme.palette.warning.main, 0.8),
          alpha(theme.palette.info.main, 0.8),
          alpha(theme.palette.success.main, 0.8),
          alpha(theme.palette.secondary.main, 0.8),
        ],
        borderColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.success.main,
          theme.palette.secondary.main,
        ],
        borderWidth: 2,
      }]
    };

    // Weekly study pattern
    const weeklyData = {
      labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      datasets: [{
        label: 'Çalışma Süresi (dk)',
        data: [45, 60, 35, 80, 90, 120, 75],
        backgroundColor: alpha(theme.palette.primary.main, 0.6),
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      }]
    };

    // Study time distribution
    const timeDistribution = {
      labels: ['Sabah (06-12)', 'Öğle (12-18)', 'Akşam (18-24)', 'Gece (00-06)'],
      datasets: [{
        data: [35, 40, 20, 5],
        backgroundColor: [
          alpha(theme.palette.warning.main, 0.8),
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.secondary.main, 0.8),
          alpha(theme.palette.info.main, 0.8),
        ],
        borderColor: [
          theme.palette.warning.main,
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
        ],
        borderWidth: 2,
      }]
    };

    return { progressData, topicData, weeklyData, timeDistribution };
  };

  const chartData = generateChartData();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError(null);
      } catch (err) {
        setError('Analytics data could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <FadeIn>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          {t('analytics.studyHabits')}
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Total Study Time */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {t('analytics.totalStudyTime')}
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {formatTime(analyticsData.totalStudyTime)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {analyticsData.totalSessions} {t('analytics.sessions')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Average Score */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {t('analytics.averageScore')}
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {analyticsData.averageScore}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('analytics.allSessions')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Strongest Topic */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BarChartIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {t('analytics.strongestTopic')}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="warning.main">
                  {analyticsData.strongestTopic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  85% {t('analytics.averageScoreDay')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {t('analytics.detailedAnalysis')}
          </Typography>
          
          <Paper elevation={0} sx={{ mt: 2, borderRadius: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
            >
              <Tab 
                icon={<TrendingUpIcon />} 
                label={t('analytics.progressOverTime')} 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                icon={<BarChartIcon />} 
                label={t('analytics.topicPerformance')} 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                icon={<CalendarMonthIcon />} 
                label={t('analytics.weeklyPattern')} 
                sx={{ textTransform: 'none' }}
              />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('analytics.progressDescription')}
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <Line 
                      data={chartData.progressData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top' as const,
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                          },
                        },
                        interaction: {
                          mode: 'nearest',
                          axis: 'x',
                          intersect: false,
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
              
              {activeTab === 1 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('analytics.topicPerformanceDescription')}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ height: 400 }}>
                        <Bar 
                          data={chartData.topicData} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ height: 400 }}>
                        <Doughnut 
                          data={chartData.timeDistribution} 
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom' as const,
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {activeTab === 2 && (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('analytics.weeklyDescription')}
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <Bar 
                      data={chartData.weeklyData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Recommendations */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {t('analytics.recommendations')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {t('analytics.focusTopics')}
                  </Typography>
                  <Typography variant="body2">
                    {t('analytics.focusTopicsTip')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {t('analytics.reviewRegularly')}
                  </Typography>
                  <Typography variant="body2">
                    {t('analytics.reviewRegularlyTip')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {t('analytics.balanceStudy')}
                  </Typography>
                  <Typography variant="body2">
                    {t('analytics.balanceStudyTip')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </FadeIn>
  );
};

export default StudyAnalyticsSimple;
