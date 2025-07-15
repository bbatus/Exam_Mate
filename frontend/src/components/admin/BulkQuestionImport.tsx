import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface BulkQuestionImportProps {
  examId: string;
  onImportComplete: () => void;
}

interface ParsedQuestion {
  section: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  examId: number;
}

const BulkQuestionImport: React.FC<BulkQuestionImportProps> = ({ examId, onImportComplete }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [step, setStep] = useState<'input' | 'preview' | 'result'>('input');
  
  const theme = useTheme();
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
    setContent('');
    setParsedQuestions([]);
    setError(null);
    setSuccess(null);
    setLoading(false);
    setImporting(false);
    setStep('input');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const parseMarkdownQuestions = (text: string): ParsedQuestion[] => {
    const questions: ParsedQuestion[] = [];
    let currentSection = 'General';
    
    // Split by question pattern (### number. Question)
    const questionBlocks = text.split(/(?=#{1,3}\s*\d+\.\s+)/);
    
    // Process each block
    for (let block of questionBlocks) {
      // Skip empty blocks
      if (!block.trim()) continue;
      
      // Check if this is a section header
      const sectionMatch = block.match(/^#+\s*(Section\s*\d+:?\s*)(.*?)(?:\(|$)/i);
      if (sectionMatch) {
        currentSection = sectionMatch[2].trim();
        continue;
      }
      
      // Try to extract question
      const questionMatch = block.match(/^#+\s*\d+\.\s+(.*?)(?=\r?\n|$)/);
      if (!questionMatch) continue;
      
      const questionText = questionMatch[1].trim();
      
      // Extract options
      const options: string[] = [];
      const optionMatches = block.matchAll(/^[A-D]\)\s*(.*?)$/gm);
      for (const match of optionMatches) {
        options.push(match[1].trim());
      }
      
      // Extract correct answer
      let correct = 0;
      const correctMatch = block.match(/\*\*Doğru Cevap:?\s*([A-D])\)/i);
      if (correctMatch) {
        // Convert A, B, C, D to 0, 1, 2, 3
        correct = correctMatch[1].charCodeAt(0) - 'A'.charCodeAt(0);
      }
      
      // Extract explanation
      let explanation = '';
      const explanationMatch = block.match(/\*\*Doğru Cevap:?\s*[A-D]\).*?\*\*\s*(.*?)(?=\r?\n\r?\n|$)/s);
      if (explanationMatch) {
        explanation = explanationMatch[1].trim();
      }
      
      // Add to questions array
      if (questionText && options.length > 0) {
        questions.push({
          section: currentSection,
          question: questionText,
          options,
          correct,
          explanation,
          examId: parseInt(examId)
        });
      }
    }
    
    return questions;
  };

  const handleParseContent = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Parse the content
      const questions = parseMarkdownQuestions(content);
      
      if (questions.length === 0) {
        setError(t('admin.questions.bulkImport.noQuestionsFound'));
        setLoading(false);
        return;
      }
      
      setParsedQuestions(questions);
      setStep('preview');
    } catch (err) {
      console.error('Error parsing questions:', err);
      setError(t('admin.questions.bulkImport.parseError'));
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (parsedQuestions.length === 0) return;
    
    setImporting(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5001/exams/${examId}/questions/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parsedQuestions)
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setSuccess(t('admin.questions.bulkImport.importSuccess', { count: result.length }));
      setStep('result');
      
      // Notify parent component
      setTimeout(() => {
        onImportComplete();
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Error importing questions:', err);
      setError(typeof err === 'object' && err !== null && 'message' in err 
        ? String(err.message) 
        : t('admin.questions.bulkImport.importError'));
    } finally {
      setImporting(false);
    }
  };

  const renderInputStep = () => (
    <>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('admin.questions.bulkImport.instructions')}
      </Typography>
      
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          bgcolor: alpha(theme.palette.info.main, 0.1)
        }}
      >
        <Typography variant="body2">
          <strong>{t('admin.questions.bulkImport.format')}</strong>
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '0.85rem', 
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            padding: '8px',
            borderRadius: '4px'
          }}>
{`## Section 1: Core Concepts

### 1. What is Kubernetes?
A) Container runtime
B) Container orchestration platform
C) Programming language
D) Database system

**Doğru Cevap: B) Container orchestration platform**

### 2. What is a Pod?
...`}
          </pre>
        </Typography>
      </Paper>
      
      <TextField
        multiline
        rows={15}
        fullWidth
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('admin.questions.bulkImport.placeholder')}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleParseContent}
          disabled={!content.trim() || loading}
          startIcon={loading ? <CircularProgress size={20} /> : <FormatListBulletedIcon />}
        >
          {loading ? t('common.processing') : t('admin.questions.bulkImport.parse')}
        </Button>
      </Box>
    </>
  );

  const renderPreviewStep = () => (
    <>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('admin.questions.bulkImport.previewInstructions', { count: parsedQuestions.length })}
      </Typography>
      
      <Box sx={{ maxHeight: '400px', overflow: 'auto', mb: 3 }}>
        {parsedQuestions.map((question, index) => (
          <Paper 
            key={index}
            elevation={0}
            sx={{ 
              p: 2, 
              mb: 2, 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Chip 
                label={`#${index + 1}`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                label={question.section} 
                size="small" 
                color="secondary" 
                variant="outlined"
              />
            </Box>
            
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {question.question}
            </Typography>
            
            {question.options.map((option, optIndex) => (
              <Typography 
                key={optIndex} 
                variant="body2"
                sx={{ 
                  mb: 0.5, 
                  pl: 2,
                  ...(optIndex === question.correct && {
                    fontWeight: 'bold',
                    color: theme.palette.success.main
                  })
                }}
              >
                {String.fromCharCode(65 + optIndex)}) {option}
                {optIndex === question.correct && ' ✓'}
              </Typography>
            ))}
            
            {question.explanation && (
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1, 
                  pt: 1,
                  borderTop: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
                  color: theme.palette.text.secondary,
                  fontSize: '0.85rem'
                }}
              >
                <strong>{t('admin.questions.explanationField')}:</strong> {question.explanation}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={() => setStep('input')}
        >
          {t('common.back')}
        </Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={importing}
          startIcon={importing ? <CircularProgress size={20} /> : <UploadFileIcon />}
        >
          {importing ? t('common.importing') : t('admin.questions.bulkImport.import')}
        </Button>
      </Box>
    </>
  );

  const renderResultStep = () => (
    <Box sx={{ textAlign: 'center', py: 3 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      
      <Button
        variant="contained"
        onClick={handleClose}
      >
        {t('common.close')}
      </Button>
    </Box>
  );

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<UploadFileIcon />}
        onClick={handleOpen}
        sx={{ ml: 1 }}
      >
        {t('admin.questions.bulkImport.button')}
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {t('admin.questions.bulkImport.title')}
        </DialogTitle>
        
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {step === 'input' && renderInputStep()}
          {step === 'preview' && renderPreviewStep()}
          {step === 'result' && renderResultStep()}
        </DialogContent>
        
        {step === 'input' && (
          <DialogActions>
            <Button onClick={handleClose}>
              {t('common.cancel')}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default BulkQuestionImport; 