import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import BulkQuestionImport from '@/components/admin/BulkQuestionImport';

interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  examId: number;
  createdAt: string;
  updatedAt: string;
}

interface Exam {
  id: number;
  title: string;
}

const QuestionsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  // Form states
  const [formSection, setFormSection] = useState<string>('');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrect, setFormCorrect] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/exams/${examId}/questions`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`http://localhost:5001/exams/${examId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exam');
        }
        const data = await response.json();
        setExam(data);
      } catch (error) {
        console.error('Error fetching exam:', error);
        setError('Failed to load exam. Please try again later.');
      }
    };

    fetchExam();
    fetchQuestions();
  }, [examId]);

  const handleDeleteClick = (question: Question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!questionToDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/exams/questions/${questionToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      // Update questions list
      setQuestions(questions.filter((q) => q.id !== questionToDelete.id));
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
      setSuccess(t('admin.questions.deleteSuccess'));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting question:', error);
      setError('Failed to delete question. Please try again later.');
    }
  };

  const handleAddClick = () => {
    // Reset form fields
    setFormSection('');
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrect(0);
    setFormExplanation('');
    setFormErrors({});
    setIsEditMode(false);
    setCurrentQuestion(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (question: Question) => {
    setCurrentQuestion(question);
    setFormSection(question.section);
    setFormQuestion(question.question);
    setFormOptions([...question.options]);
    setFormCorrect(question.correct);
    setFormExplanation(question.explanation);
    setFormErrors({});
    setIsEditMode(true);
    setFormDialogOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formSection.trim()) {
      errors.section = t('admin.questions.errors.sectionRequired');
    }
    
    if (!formQuestion.trim()) {
      errors.question = t('admin.questions.errors.questionRequired');
    }
    
    const nonEmptyOptions = formOptions.filter(opt => opt.trim() !== '');
    if (nonEmptyOptions.length < 2) {
      errors.options = t('admin.questions.errors.optionsRequired');
    }
    
    if (formCorrect < 0 || formCorrect >= formOptions.length) {
      errors.correct = t('admin.questions.errors.correctRequired');
    }
    
    if (!formExplanation.trim()) {
      errors.explanation = t('admin.questions.errors.explanationRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormSubmitting(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const nonEmptyOptions = formOptions.filter(opt => opt.trim() !== '');
      
      const questionData = {
        section: formSection,
        question: formQuestion,
        options: nonEmptyOptions,
        correct: formCorrect,
        explanation: formExplanation,
        examId: Number(examId)
      };
      
      let response;
      
      if (isEditMode && currentQuestion) {
        // Update existing question
        response = await fetch(`http://localhost:5001/exams/questions/${currentQuestion.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(questionData)
        });
      } else {
        // Create new question
        response = await fetch(`http://localhost:5001/exams/${examId}/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(questionData)
        });
      }
      
      if (!response.ok) {
        throw new Error(isEditMode ? 'Failed to update question' : 'Failed to create question');
      }
      
      const savedQuestion = await response.json();
      
      if (isEditMode) {
        // Update the question in the list
        setQuestions(questions.map(q => q.id === savedQuestion.id ? savedQuestion : q));
        setSuccess(t('admin.questions.updateSuccess'));
      } else {
        // Add the new question to the list
        setQuestions([...questions, savedQuestion]);
        setSuccess(t('admin.questions.createSuccess'));
      }
      
      setFormDialogOpen(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error saving question:', error);
      setError(isEditMode ? t('admin.questions.updateError') : t('admin.questions.createError'));
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formOptions];
    newOptions[index] = value;
    setFormOptions(newOptions);
  };

  const addOption = () => {
    setFormOptions([...formOptions, '']);
  };

  const removeOption = (index: number) => {
    if (formOptions.length <= 2) return;
    
    const newOptions = formOptions.filter((_, i) => i !== index);
    setFormOptions(newOptions);
    
    // Adjust correct answer index if needed
    if (formCorrect === index) {
      setFormCorrect(0);
    } else if (formCorrect > index) {
      setFormCorrect(formCorrect - 1);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            {exam ? t('admin.questions.title', { examTitle: exam.title }) : t('admin.questions.loading')}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/exams')}
              sx={{ mr: 2 }}
            >
              {t('common.back')}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              }}
            >
              {t('admin.questions.add')}
            </Button>
            <BulkQuestionImport examId={examId || ''} onImportComplete={() => fetchQuestions()} />
          </Box>
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
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
                  <TableRow>
                    <TableCell>{t('admin.questions.columns.id')}</TableCell>
                    <TableCell>{t('admin.questions.columns.section')}</TableCell>
                    <TableCell>{t('admin.questions.columns.question')}</TableCell>
                    <TableCell>{t('admin.questions.columns.options')}</TableCell>
                    <TableCell align="right">{t('admin.questions.columns.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.length > 0 ? (
                    questions.map((question) => (
                      <TableRow key={question.id} hover>
                        <TableCell>{question.id}</TableCell>
                        <TableCell>{question.section}</TableCell>
                        <TableCell>
                          {question.question.length > 50
                            ? `${question.question.substring(0, 50)}...`
                            : question.question}
                        </TableCell>
                        <TableCell>{question.options.length} options</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Tooltip title={t('common.edit')}>
                              <IconButton
                                onClick={() => handleEditClick(question)}
                                sx={{ color: theme.palette.primary.main }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.delete')}>
                              <IconButton
                                onClick={() => handleDeleteClick(question)}
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
                      <TableCell colSpan={5} align="center">
                        <Typography sx={{ py: 3 }}>
                          {t('admin.questions.noQuestions')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t('admin.questions.deleteTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('admin.questions.deleteConfirmation')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Question Form Dialog */}
      <Dialog 
        open={formDialogOpen} 
        onClose={() => setFormDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isEditMode ? t('admin.questions.edit') : t('admin.questions.create')}
        </DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label={t('admin.questions.sectionField')}
                value={formSection}
                onChange={(e) => setFormSection(e.target.value)}
                error={!!formErrors.section}
                helperText={formErrors.section}
                disabled={formSubmitting}
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label={t('admin.questions.questionField')}
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                error={!!formErrors.question}
                helperText={formErrors.question}
                disabled={formSubmitting}
                multiline
                rows={3}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {t('admin.questions.optionsField')}
                {formErrors.options && (
                  <FormHelperText error>{formErrors.options}</FormHelperText>
                )}
              </Typography>
              
              {formOptions.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`${t('admin.questions.option')} ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    disabled={formSubmitting}
                  />
                  <FormControl sx={{ minWidth: 120, ml: 2 }}>
                    <Button
                      color="primary"
                      variant={formCorrect === index ? "contained" : "outlined"}
                      onClick={() => setFormCorrect(index)}
                      disabled={formSubmitting}
                    >
                      {formCorrect === index ? t('admin.questions.correctOption') : t('admin.questions.setCorrect')}
                    </Button>
                  </FormControl>
                  <IconButton 
                    color="error" 
                    onClick={() => removeOption(index)}
                    disabled={formOptions.length <= 2 || formSubmitting}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              
              <Button
                variant="outlined"
                onClick={addOption}
                disabled={formSubmitting}
                sx={{ mb: 3 }}
              >
                {t('admin.questions.addOption')}
              </Button>
              
              {formErrors.correct && (
                <FormHelperText error sx={{ mt: -2, mb: 2 }}>
                  {formErrors.correct}
                </FormHelperText>
              )}
              
              <TextField
                fullWidth
                label={t('admin.questions.explanationField')}
                value={formExplanation}
                onChange={(e) => setFormExplanation(e.target.value)}
                error={!!formErrors.explanation}
                helperText={formErrors.explanation}
                disabled={formSubmitting}
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFormDialogOpen(false)} disabled={formSubmitting}>
              {t('common.cancel')}
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={formSubmitting}
              color="primary"
            >
              {formSubmitting ? (
                <CircularProgress size={24} />
              ) : isEditMode ? (
                t('common.update')
              ) : (
                t('common.create')
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </AdminLayout>
  );
};

export default QuestionsPage; 