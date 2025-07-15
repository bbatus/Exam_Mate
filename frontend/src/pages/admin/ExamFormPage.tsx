import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTranslation } from 'react-i18next';

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
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Authentication required');
        }

        const response = await fetch(`http://localhost:5001/exams/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
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
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const url = isEditMode
        ? `http://localhost:5001/exams/${id}`
        : 'http://localhost:5001/exams';
      
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? 'Failed to update exam' : 'Failed to create exam');
      }

      const data = await response.json();
      
      setSuccess(isEditMode
        ? t('admin.exams.updateSuccess')
        : t('admin.exams.createSuccess')
      );
      
      if (!isEditMode) {
        // If creating a new exam, redirect to edit page after creation
        setTimeout(() => {
          navigate(`/admin/exams/${data.id}/edit`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving exam:', error);
      setError(isEditMode
        ? t('admin.exams.updateError')
        : t('admin.exams.createError')
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {isEditMode ? t('admin.exams.edit') : t('admin.exams.create')}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/exams')}
          >
            {t('common.back')}
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
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

            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {t('admin.exams.details')}
              </Typography>
              
              <TextField
                fullWidth
                label={t('admin.exams.titleField')}
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                sx={{ mb: 3 }}
                disabled={saving}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={saving}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  }}
                >
                  {saving ? <CircularProgress size={24} /> : t('common.save')}
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </AdminLayout>
  );
};

export default ExamFormPage; 