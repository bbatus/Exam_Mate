import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  useTheme,
  alpha,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useTranslation } from 'react-i18next';

interface Exam {
  id: number;
  title: string;
}

const AdminDashboardPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('isAdmin');
      if (!isAdmin) {
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:5001/exams');
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Mock statistics for dashboard
  const stats = {
    totalExams: exams.length,
    totalQuestions: 120,
    totalUsers: 450,
    totalExamsTaken: 1250,
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {t('admin.dashboard')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/exams/new')}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            }}
          >
            {t('admin.exams.add')}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Statistics Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)}, ${alpha(
                  theme.palette.primary.dark,
                  0.9
                )})`,
                color: 'white',
              }}
            >
              <CardContent>
                <QuizIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                <Typography variant="h4" fontWeight={700}>
                  {stats.totalExams}
                </Typography>
                <Typography variant="body1">{t('admin.stats.totalExams')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha('#8b5cf6', 0.8)}, ${alpha('#6d28d9', 0.9)})`,
                color: 'white',
              }}
            >
              <CardContent>
                <QuizIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                <Typography variant="h4" fontWeight={700}>
                  {stats.totalQuestions}
                </Typography>
                <Typography variant="body1">{t('admin.stats.totalQuestions')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha('#10b981', 0.8)}, ${alpha('#059669', 0.9)})`,
                color: 'white',
              }}
            >
              <CardContent>
                <PeopleIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                <Typography variant="h4" fontWeight={700}>
                  {stats.totalUsers}
                </Typography>
                <Typography variant="body1">{t('admin.stats.totalUsers')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha('#f59e0b', 0.8)}, ${alpha('#d97706', 0.9)})`,
                color: 'white',
              }}
            >
              <CardContent>
                <AnalyticsIcon sx={{ fontSize: 40, mb: 1, opacity: 0.8 }} />
                <Typography variant="h4" fontWeight={700}>
                  {stats.totalExamsTaken}
                </Typography>
                <Typography variant="body1">{t('admin.stats.totalExamsTaken')}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Exams */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t('admin.recentExams')}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Typography>{t('common.loading')}</Typography>
              ) : exams.length > 0 ? (
                <Box>
                  {exams.slice(0, 5).map((exam) => (
                    <Box
                      key={exam.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      <Typography>{exam.title}</Typography>
                      <Box>
                        <Button
                          size="small"
                          onClick={() => navigate(`/admin/exams/${exam.id}/edit`)}
                          sx={{ mr: 1 }}
                        >
                          {t('common.edit')}
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/admin/exams/${exam.id}/questions`)}
                        >
                          {t('admin.manageQuestions')}
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography>{t('admin.noExams')}</Typography>
              )}

              {exams.length > 5 && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={() => navigate('/admin/exams')}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {t('admin.viewAllExams')}
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboardPage; 