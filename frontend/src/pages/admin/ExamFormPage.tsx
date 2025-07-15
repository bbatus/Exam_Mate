import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  alpha,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

interface Exam {
  id: number;
  title: string;
}

const ExamFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new' && id !== undefined;
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(isEditMode);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    const fetchExam = async () => {
      if (!isEditMode) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/exams/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exam');
        }
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Failed to load exam. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const url = isEditMode
        ? `http://localhost:5001/exams/${id}`
        : 'http://localhost:5001/exams';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} exam`);
      }

      const data = await response.json();
      setSuccess(
        isEditMode
          ? t('admin.exams.updateSuccess')
          : t('admin.exams.createSuccess')
      );

      if (!isEditMode) {
        // Reset form after successful creation
        setTitle('');
        // Navigate to edit page after a short delay
        setTimeout(() => {
          navigate(`/admin/exams/${data.id}/edit`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving exam:', error);
      setError(
        isEditMode
          ? t('admin.exams.updateError')
          : t('admin.exams.createError')
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/exams')}
            sx={{ mr: 2 }}
          >
            {t('common.back')}
          </Button>
          <Typography variant="h4" fontWeight={600}>
            {isEditMode ? t('admin.exams.edit') : t('admin.exams.create')}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
            {t('admin.exams.details')}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label={t('admin.exams.titleField')}
              name="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="button"
                onClick={() => navigate('/admin/exams')}
                sx={{ mr: 2 }}
              >
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={!title.trim() || saving}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                }}
              >
                {saving ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t('common.save')
                )}
              </Button>
            </Box>
          </Box>
        </Paper>

        {isEditMode && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/admin/exams/${id}/questions`)}
            >
              {t('admin.manageQuestions')}
            </Button>
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default ExamFormPage; 