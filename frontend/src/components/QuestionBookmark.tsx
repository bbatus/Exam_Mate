import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteIcon from '@mui/icons-material/Note';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface BookmarkedQuestion {
  examId: number;
  questionId: number;
  questionText: string;
  note: string;
  timestamp: number;
}

interface QuestionBookmarkProps {
  examId: number;
  questionId: number;
  questionText: string;
}

const QuestionBookmark: React.FC<QuestionBookmarkProps> = ({ examId, questionId, questionText }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([]);
  const theme = useTheme();

  // Load bookmarked questions from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedQuestions');
    if (savedBookmarks) {
      const parsedBookmarks: BookmarkedQuestion[] = JSON.parse(savedBookmarks);
      setBookmarkedQuestions(parsedBookmarks);
      
      // Check if current question is bookmarked
      const isCurrentBookmarked = parsedBookmarks.some(
        q => q.examId === examId && q.questionId === questionId
      );
      setIsBookmarked(isCurrentBookmarked);
      
      // Load note if exists
      const existingBookmark = parsedBookmarks.find(
        q => q.examId === examId && q.questionId === questionId
      );
      if (existingBookmark) {
        setNote(existingBookmark.note || '');
      }
    }
  }, [examId, questionId]);

  const toggleBookmark = () => {
    let updatedBookmarks: BookmarkedQuestion[] = [...bookmarkedQuestions];
    
    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = updatedBookmarks.filter(
        q => !(q.examId === examId && q.questionId === questionId)
      );
      setIsBookmarked(false);
      setNote('');
    } else {
      // Add bookmark
      updatedBookmarks.push({
        examId,
        questionId,
        questionText: questionText.length > 100 ? questionText.substring(0, 100) + '...' : questionText,
        note: '',
        timestamp: Date.now(),
      });
      setIsBookmarked(true);
    }
    
    setBookmarkedQuestions(updatedBookmarks);
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const saveNote = () => {
    const updatedBookmarks = bookmarkedQuestions.map(q => {
      if (q.examId === examId && q.questionId === questionId) {
        return { ...q, note };
      }
      return q;
    });
    
    setBookmarkedQuestions(updatedBookmarks);
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
    setIsNoteDialogOpen(false);
  };

  const openNoteDialog = () => {
    setIsNoteDialogOpen(true);
  };

  const deleteBookmark = (targetExamId: number, targetQuestionId: number) => {
    const updatedBookmarks = bookmarkedQuestions.filter(
      q => !(q.examId === targetExamId && q.questionId === targetQuestionId)
    );
    
    setBookmarkedQuestions(updatedBookmarks);
    localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
    
    // Update current question bookmark status if it's the one being deleted
    if (targetExamId === examId && targetQuestionId === questionId) {
      setIsBookmarked(false);
      setNote('');
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={isBookmarked ? "İşareti Kaldır" : "Soruyu İşaretle"}>
          <IconButton 
            onClick={toggleBookmark}
            color={isBookmarked ? "secondary" : "default"}
            size="small"
          >
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title={note ? "Notu Düzenle" : "Not Ekle"}>
          <IconButton 
            onClick={openNoteDialog}
            color={note ? "primary" : "default"}
            size="small"
            disabled={!isBookmarked}
          >
            {note ? <NoteIcon /> : <NoteAddIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="İşaretlenen Soruları Göster">
          <IconButton 
            onClick={toggleDrawer}
            color="primary"
            size="small"
          >
            <MenuBookIcon />
            {bookmarkedQuestions.length > 0 && (
              <Chip 
                label={bookmarkedQuestions.length} 
                color="secondary" 
                size="small" 
                sx={{ 
                  position: 'absolute', 
                  top: -5, 
                  right: -5,
                  height: 16,
                  width: 16,
                  fontSize: 10
                }} 
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Note Dialog */}
      <Dialog open={isNoteDialogOpen} onClose={() => setIsNoteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Soru İçin Not Ekle
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {questionText.length > 100 ? questionText.substring(0, 100) + '...' : questionText}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Notunuz"
            fullWidth
            multiline
            rows={4}
            value={note}
            onChange={handleNoteChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNoteDialogOpen(false)}>İptal</Button>
          <Button onClick={saveNote} variant="contained" color="primary">Kaydet</Button>
        </DialogActions>
      </Dialog>
      
      {/* Bookmarked Questions Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <BookmarkIcon sx={{ mr: 1 }} color="secondary" />
            İşaretlenen Sorular
          </Typography>
          
          {bookmarkedQuestions.length === 0 ? (
            <Box sx={{ 
              p: 3, 
              textAlign: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 2
            }}>
              <Typography variant="body1" color="text.secondary">
                Henüz işaretlenmiş soru bulunmuyor.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Soruları işaretlemek için soru sayfasındaki yer işareti simgesine tıklayın.
              </Typography>
            </Box>
          ) : (
            <List sx={{ maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }}>
              {bookmarkedQuestions.map((bookmark, index) => (
                <React.Fragment key={`${bookmark.examId}-${bookmark.questionId}`}>
                  {index > 0 && <Divider variant="inset" component="li" />}
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => deleteBookmark(bookmark.examId, bookmark.questionId)}
                        size="small"
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <BookmarkIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={bookmark.questionText}
                      secondary={
                        <>
                          {bookmark.note && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ 
                                display: 'block', 
                                mt: 1, 
                                p: 1, 
                                bgcolor: alpha(theme.palette.info.main, 0.05),
                                borderRadius: 1,
                                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                              }}
                            >
                              <strong>Not:</strong> {bookmark.note}
                            </Typography>
                          )}
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {new Date(bookmark.timestamp).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={toggleDrawer} variant="outlined">
              Kapat
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default QuestionBookmark; 