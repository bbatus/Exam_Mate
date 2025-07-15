import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
  alpha,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import QuizIcon from '@mui/icons-material/Quiz';
import { useTranslation } from 'react-i18next';

interface Exam {
  id: number;
  title: string;
  createdAt: string;
  questions: any[];
}

const ExamsPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const isAdmin = localStorage.getItem('isAdmin');
      
      if (!token || !isAdmin) {
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
        setError('Failed to load exams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleDeleteClick = (exam: Exam) => {
    setExamToDelete(exam);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!examToDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/exams/${examToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete exam');
      }

      // Update exams list
      setExams(exams.filter((exam) => exam.id !== examToDelete.id));
      setDeleteDialogOpen(false);
      setExamToDelete(null);
    } catch (error) {
      console.error('Error deleting exam:', error);
      setError('Failed to delete exam. Please try again later.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setExamToDelete(null);
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {t('admin.exams.title')}
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

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                  <TableCell>{t('admin.exams.columns.id')}</TableCell>
                  <TableCell>{t('admin.exams.columns.name')}</TableCell>
                  <TableCell>{t('admin.exams.columns.questions')}</TableCell>
                  <TableCell>{t('admin.exams.columns.created')}</TableCell>
                  <TableCell align="right">{t('admin.exams.columns.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <TableRow key={exam.id} hover>
                      <TableCell>{exam.id}</TableCell>
                      <TableCell>{exam.title}</TableCell>
                      <TableCell>{exam.questions?.length || 0}</TableCell>
                      <TableCell>
                        {new Date(exam.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title={t('admin.manageQuestions')}>
                            <IconButton
                              onClick={() => navigate(`/admin/exams/${exam.id}/questions`)}
                              sx={{ color: theme.palette.info.main }}
                            >
                              <QuizIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton
                              onClick={() => navigate(`/admin/exams/${exam.id}/edit`)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              onClick={() => handleDeleteClick(exam)}
                              sx={{ color: theme.palette.error.main }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">{t('admin.noExams')}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>{t('admin.exams.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {examToDelete && t('admin.exams.deleteConfirmation', { title: examToDelete.title })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ExamsPage; 