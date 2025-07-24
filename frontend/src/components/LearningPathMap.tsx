import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Button
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import LockIcon from '@mui/icons-material/Lock';
import { FadeIn, ScaleIn } from './UIAnimations';
import { useTranslation } from 'react-i18next';

// Define topic structure
interface Topic {
  id: number;
  name: string;
  description: string;
  progress: number; // 0-100
  status: 'locked' | 'in-progress' | 'completed';
  dependencies: number[];
  questionsCount: number;
  position: { x: number; y: number };
}

// Define exam structure
interface Exam {
  id: number;
  title: string;
  topics: Topic[];
}

interface LearningPathMapProps {
  examId?: number;
}

const LearningPathMap: React.FC<LearningPathMapProps> = ({ examId }) => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number>(examId || 1);
  const theme = useTheme();
  const { t } = useTranslation();

  // Mock data for Google Digital Leader exam topics
  const mockGoogleDigitalLeaderExam: Exam = {
    id: 1,
    title: 'Google Cloud Digital Leader',
    topics: [
      {
        id: 1,
        name: 'Cloud Fundamentals',
        description: 'Understanding basic cloud concepts, service models, and deployment models.',
        progress: 75,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 25,
        position: { x: 150, y: 150 }
      },
      {
        id: 2,
        name: 'Cloud Security',
        description: 'Understanding cloud security principles, shared responsibility model, and security controls.',
        progress: 40,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 20,
        position: { x: 400, y: 300 }
      },
      {
        id: 3,
        name: 'Cloud Economics',
        description: 'Understanding cloud pricing models, TCO, ROI, and financial aspects of cloud adoption.',
        progress: 20,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 15,
        position: { x: 400, y: 50 }
      },
      {
        id: 4,
        name: 'Google Cloud Products',
        description: 'Understanding key Google Cloud products and services.',
        progress: 10,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 30,
        position: { x: 650, y: 200 }
      },
      {
        id: 5,
        name: 'Cloud Migration',
        description: 'Understanding cloud migration strategies, patterns, and best practices.',
        progress: 0,
        status: 'locked',
        dependencies: [1, 2, 3],
        questionsCount: 18,
        position: { x: 650, y: 400 }
      },
      {
        id: 6,
        name: 'Cloud Innovation',
        description: 'Understanding how cloud enables innovation, digital transformation, and new business models.',
        progress: 0,
        status: 'locked',
        dependencies: [4],
        questionsCount: 22,
        position: { x: 900, y: 200 }
      }
    ]
  };

  // Mock data for AWS Cloud Practitioner exam topics
  const mockAWSCloudPractitionerExam: Exam = {
    id: 2,
    title: 'AWS Certified Cloud Practitioner',
    topics: [
      {
        id: 1,
        name: 'Cloud Concepts',
        description: 'Understanding of cloud computing concepts.',
        progress: 60,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 22,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Security and Compliance',
        description: 'Understanding of AWS security practices and compliance.',
        progress: 30,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 18,
        position: { x: 450, y: 350 }
      },
      {
        id: 3,
        name: 'Technology',
        description: 'Understanding of AWS services and their common use cases.',
        progress: 15,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 30,
        position: { x: 450, y: 50 }
      },
      {
        id: 4,
        name: 'Billing and Pricing',
        description: 'Understanding of AWS pricing, billing, and cost management.',
        progress: 0,
        status: 'locked',
        dependencies: [1, 3],
        questionsCount: 15,
        position: { x: 750, y: 200 }
      }
    ]
  };

  // Mock data for Google Cloud Associate Cloud Engineer exam topics
  const mockGoogleCloudAssociateEngineerExam: Exam = {
    id: 3,
    title: 'Google Cloud Associate Cloud Engineer',
    topics: [
      {
        id: 1,
        name: 'Setting up a cloud solution environment',
        description: 'Setting up cloud projects and accounts, managing billing, and installing and configuring the CLI.',
        progress: 45,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 8,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Planning and configuring a cloud solution',
        description: 'Planning and estimating using the Pricing Calculator, planning and configuring compute resources and data storage options.',
        progress: 30,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 14,
        position: { x: 450, y: 200 }
      },
      {
        id: 3,
        name: 'Deploying and implementing a cloud solution',
        description: 'Deploying Compute Engine resources, Google Kubernetes Engine resources, Cloud Run, and Cloud Functions.',
        progress: 20,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 12,
        position: { x: 750, y: 200 }
      },
      {
        id: 4,
        name: 'Ensuring successful operation',
        description: 'Managing Compute Engine resources, managing Google Kubernetes Engine resources, managing Cloud Run resources, and managing storage.',
        progress: 10,
        status: 'in-progress',
        dependencies: [3],
        questionsCount: 16,
        position: { x: 750, y: 450 }
      },
      {
        id: 5,
        name: 'Configuring access and security',
        description: 'Managing IAM, managing service accounts, viewing audit logs, and managing network security.',
        progress: 0,
        status: 'locked',
        dependencies: [1, 4],
        questionsCount: 12,
        position: { x: 450, y: 450 }
      }
    ]
  };

  // Mock data for Google Cloud Generative AI Leader exam topics
  const mockGoogleCloudGenAILeaderExam: Exam = {
    id: 5,
    title: 'Google Cloud Generative AI Leader',
    topics: [
      {
        id: 1,
        name: 'Fundamentals of gen AI',
        description: 'Understanding basic generative AI concepts, foundation models, and multimodal AI.',
        progress: 60,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 15,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Google Cloud\'s gen AI offerings',
        description: 'Understanding Google\'s AI-first approach, Gemini, Vertex AI, and other Google Cloud gen AI services.',
        progress: 40,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 18,
        position: { x: 450, y: 200 }
      },
      {
        id: 3,
        name: 'Techniques to improve gen AI model output',
        description: 'Understanding prompt engineering, grounding, fine-tuning, and other techniques to improve model performance.',
        progress: 25,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 10,
        position: { x: 450, y: 450 }
      },
      {
        id: 4,
        name: 'Business strategies for gen AI solutions',
        description: 'Understanding responsible AI, security frameworks, and business implementation strategies.',
        progress: 10,
        status: 'in-progress',
        dependencies: [2, 3],
        questionsCount: 7,
        position: { x: 750, y: 325 }
      }
    ]
  };

  // Mock data for Kubernetes exam
  const mockKubernetesExam: Exam = {
    id: 5,
    title: 'Kubernetes',
    topics: [
      {
        id: 1,
        name: 'Kubernetes Fundamentals',
        description: 'Understanding containers, pods, and basic Kubernetes concepts.',
        progress: 50,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 20,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Workloads & Scheduling',
        description: 'Understanding deployments, services, and scheduling.',
        progress: 30,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 25,
        position: { x: 450, y: 200 }
      },
      {
        id: 3,
        name: 'Services & Networking',
        description: 'Understanding services, ingress, and networking concepts.',
        progress: 20,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 18,
        position: { x: 750, y: 200 }
      },
      {
        id: 4,
        name: 'Storage',
        description: 'Understanding volumes, persistent volumes, and storage classes.',
        progress: 10,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 15,
        position: { x: 450, y: 400 }
      },
      {
        id: 5,
        name: 'Troubleshooting',
        description: 'Debugging and troubleshooting Kubernetes applications.',
        progress: 0,
        status: 'locked',
        dependencies: [2, 3, 4],
        questionsCount: 22,
        position: { x: 750, y: 400 }
      }
    ]
  };

  // Mock data for Kubernetes Intermediate Level exam
  const mockKubernetesIntermediateExam: Exam = {
    id: 16,
    title: 'Kubernetes Orta Seviye',
    topics: [
      {
        id: 1,
        name: 'Advanced Workloads',
        description: 'StatefulSets, DaemonSets, and advanced deployment strategies.',
        progress: 40,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 18,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Security',
        description: 'RBAC, security contexts, and network policies.',
        progress: 25,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 20,
        position: { x: 450, y: 200 }
      },
      {
        id: 3,
        name: 'Monitoring & Logging',
        description: 'Monitoring cluster health and application logs.',
        progress: 15,
        status: 'in-progress',
        dependencies: [1],
        questionsCount: 16,
        position: { x: 450, y: 400 }
      },
      {
        id: 4,
        name: 'Cluster Administration',
        description: 'Managing cluster resources and maintenance.',
        progress: 0,
        status: 'locked',
        dependencies: [1, 2, 3],
        questionsCount: 22,
        position: { x: 750, y: 300 }
      }
    ]
  };

  // Mock data for English A1 Level exam
  const mockEnglishA1Exam: Exam = {
    id: 17,
    title: 'English A1 Level',
    topics: [
      {
        id: 1,
        name: 'Basic Grammar',
        description: 'Present tense, articles, and basic sentence structure.',
        progress: 70,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 25,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Vocabulary',
        description: 'Common words, numbers, and everyday expressions.',
        progress: 60,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 20,
        position: { x: 150, y: 400 }
      },
      {
        id: 3,
        name: 'Speaking & Listening',
        description: 'Basic conversations and understanding simple phrases.',
        progress: 40,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 18,
        position: { x: 450, y: 300 }
      },
      {
        id: 4,
        name: 'Reading & Writing',
        description: 'Simple texts and basic writing skills.',
        progress: 30,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 15,
        position: { x: 750, y: 300 }
      }
    ]
  };

  // Mock data for English A2 Level exam
  const mockEnglishA2Exam: Exam = {
    id: 18,
    title: 'English A2 Level',
    topics: [
      {
        id: 1,
        name: 'Intermediate Grammar',
        description: 'Past tense, future tense, and comparative forms.',
        progress: 55,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 22,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Extended Vocabulary',
        description: 'Family, work, hobbies, and travel vocabulary.',
        progress: 45,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 25,
        position: { x: 150, y: 400 }
      },
      {
        id: 3,
        name: 'Communication Skills',
        description: 'Describing experiences and expressing opinions.',
        progress: 35,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 20,
        position: { x: 450, y: 300 }
      },
      {
        id: 4,
        name: 'Practical English',
        description: 'Shopping, directions, and everyday situations.',
        progress: 25,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 18,
        position: { x: 750, y: 300 }
      }
    ]
  };

  // Mock data for English B1 Level exam
  const mockEnglishB1Exam: Exam = {
    id: 19,
    title: 'English B1 Level',
    topics: [
      {
        id: 1,
        name: 'Advanced Grammar',
        description: 'Conditional sentences, passive voice, and complex structures.',
        progress: 40,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 28,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Professional Vocabulary',
        description: 'Work, education, and formal communication vocabulary.',
        progress: 35,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 24,
        position: { x: 150, y: 400 }
      },
      {
        id: 3,
        name: 'Fluency Skills',
        description: 'Expressing ideas clearly and understanding main points.',
        progress: 25,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 22,
        position: { x: 450, y: 300 }
      },
      {
        id: 4,
        name: 'Text Comprehension',
        description: 'Understanding complex texts and writing coherent texts.',
        progress: 15,
        status: 'in-progress',
        dependencies: [1, 2, 3],
        questionsCount: 20,
        position: { x: 750, y: 300 }
      }
    ]
  };

  // Mock data for English B2 Level exam
  const mockEnglishB2Exam: Exam = {
    id: 20,
    title: 'English B2 Level',
    topics: [
      {
        id: 1,
        name: 'Complex Grammar',
        description: 'Advanced tenses, reported speech, and sophisticated structures.',
        progress: 30,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 30,
        position: { x: 150, y: 200 }
      },
      {
        id: 2,
        name: 'Academic Vocabulary',
        description: 'Abstract concepts, academic writing, and specialized terms.',
        progress: 25,
        status: 'in-progress',
        dependencies: [],
        questionsCount: 26,
        position: { x: 150, y: 400 }
      },
      {
        id: 3,
        name: 'Advanced Communication',
        description: 'Debates, presentations, and nuanced expression.',
        progress: 20,
        status: 'in-progress',
        dependencies: [1, 2],
        questionsCount: 24,
        position: { x: 450, y: 300 }
      },
      {
        id: 4,
        name: 'Critical Analysis',
        description: 'Analyzing complex texts and writing detailed reports.',
        progress: 10,
        status: 'in-progress',
        dependencies: [1, 2, 3],
        questionsCount: 22,
        position: { x: 750, y: 300 }
      }
    ]
  };

  // Mock exams data
  const mockExams: Record<number, Exam> = {
    1: mockGoogleDigitalLeaderExam,
    2: mockGoogleCloudGenAILeaderExam,
    3: mockGoogleCloudAssociateEngineerExam,
    5: mockKubernetesExam,
    16: mockKubernetesIntermediateExam,
    17: mockEnglishA1Exam,
    18: mockEnglishA2Exam,
    19: mockEnglishB1Exam,
    20: mockEnglishB2Exam,
    21: mockAWSCloudPractitionerExam
  };

  // Update selectedExamId when examId prop changes
  useEffect(() => {
    if (examId) {
      setSelectedExamId(examId);
    }
  }, [examId]);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data for now
        if (selectedExamId && mockExams[selectedExamId]) {
          setExam(mockExams[selectedExamId]);
        } else {
          // Default to Google Digital Leader if no examId provided
          setExam(mockExams[1]);
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setError('Sınav bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [selectedExamId]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleExamChange = (_event: React.MouseEvent<HTMLElement>, newExamId: number) => {
    if (newExamId !== null) {
      setSelectedExamId(newExamId);
      setSelectedTopic(null);
    }
  };

  // Draw connections between topics
  const renderConnections = () => {
    if (!exam) return null;

    return exam.topics.map(topic => {
      return topic.dependencies.map(depId => {
        const dependentTopic = exam.topics.find(t => t.id === depId);
        if (!dependentTopic) return null;

        // Calculate line coordinates
        const x1 = dependentTopic.position.x;
        const y1 = dependentTopic.position.y;
        const x2 = topic.position.x;
        const y2 = topic.position.y;

        // Generate a unique key
        const key = `connection-${depId}-${topic.id}`;

        return (
          <line
            key={key}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={
              topic.status === 'locked'
                ? theme.palette.text.disabled
                : theme.palette.primary.main
            }
            strokeWidth={2}
            strokeDasharray={topic.status === 'locked' ? '5,5' : ''}
            strokeOpacity={0.7}
          />
        );
      });
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !exam) {
    return (
      <Box sx={{ p: 3, bgcolor: alpha(theme.palette.error.main, 0.1), borderRadius: 2 }}>
        <Typography color="error">{error || t('common.error')}</Typography>
      </Box>
    );
  }

  return (
    <FadeIn>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.7),
          overflow: 'hidden'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            {exam.title} - {t('learningPath.topicMap')}
          </Typography>
        </Box>

        <Box sx={{ mb: 3, overflowX: 'auto' }}>
          <ToggleButtonGroup
            value={selectedExamId}
            exclusive
            onChange={handleExamChange}
            aria-label="exam selection"
            size="small"
            color="primary"
            sx={{ 
              flexWrap: { xs: 'wrap', md: 'nowrap' },
              '& .MuiToggleButton-root': {
                minWidth: { xs: '100%', sm: 'auto' },
                mb: { xs: 1, md: 0 }
              }
            }}
          >
            <ToggleButton value={1} aria-label="Google Cloud Digital Leader">
              Google Cloud Digital Leader
            </ToggleButton>
            <ToggleButton value={2} aria-label="AWS Cloud Practitioner">
              AWS Cloud Practitioner
            </ToggleButton>
            <ToggleButton value={3} aria-label="Google Cloud Associate Engineer">
              Google Cloud Associate Engineer
            </ToggleButton>
            <ToggleButton value={5} aria-label="Google Cloud Generative AI Leader">
              Google Cloud Generative AI Leader
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            <em>{t('learningPath.tip')}</em>
          </Typography>
          <Box>
            <Tooltip title={t('learningPath.zoomOut')}>
              <IconButton onClick={handleZoomOut} size="small">
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('learningPath.zoomIn')}>
              <IconButton onClick={handleZoomIn} size="small">
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            position: 'relative', 
            height: '500px',
            width: '100%',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            overflow: 'hidden',
            mb: 3
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '1000px',
              width: '1200px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease',
            }}
          >
            <svg 
              width="100%" 
              height="100%" 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
              }}
            >
              {renderConnections()}
            </svg>

            {exam.topics.map((topic) => (
              <Box
                key={topic.id}
                sx={{
                  position: 'absolute',
                  top: topic.position.y,
                  left: topic.position.x,
                  transform: 'translate(-50%, -50%)',
                  zIndex: selectedTopic?.id === topic.id ? 10 : 1,
                  transition: 'all 0.3s ease',
                }}
              >
                <ScaleIn>
                  <Paper
                    elevation={selectedTopic?.id === topic.id ? 6 : 1}
                    onClick={() => handleTopicClick(topic)}
                    sx={{
                      p: 2.5,
                      width: 180,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: `2px solid ${
                        topic.status === 'completed'
                          ? theme.palette.success.main
                          : topic.status === 'locked'
                          ? theme.palette.text.disabled
                          : theme.palette.primary.main
                      }`,
                      bgcolor: 
                        selectedTopic?.id === topic.id 
                          ? alpha(theme.palette.primary.main, 0.1)
                          : topic.status === 'locked'
                          ? alpha(theme.palette.action.disabledBackground, 0.5)
                          : alpha(theme.palette.background.paper, 0.9),
                      '&:hover': {
                        bgcolor: 
                          topic.status === 'locked'
                            ? alpha(theme.palette.action.disabledBackground, 0.7)
                            : alpha(theme.palette.primary.main, 0.1),
                        transform: 'scale(1.05)'
                      },
                      transition: 'transform 0.2s ease, background-color 0.2s ease',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ 
                          color: topic.status === 'locked' ? theme.palette.text.disabled : 'inherit',
                          fontSize: '0.9rem',
                          lineHeight: 1.3,
                          mr: 1
                        }}
                      >
                        {topic.name}
                      </Typography>
                      {topic.status === 'completed' && (
                        <CheckCircleIcon fontSize="small" color="success" />
                      )}
                      {topic.status === 'locked' && (
                        <LockIcon fontSize="small" color="disabled" />
                      )}
                      {topic.status === 'in-progress' && (
                        <PendingIcon fontSize="small" color="primary" />
                      )}
                    </Box>
                    
                    <Box sx={{ position: 'relative', height: 8, bgcolor: alpha(theme.palette.divider, 0.2), borderRadius: 3, mb: 1.5 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${topic.progress}%`,
                          bgcolor: 
                            topic.status === 'completed'
                              ? theme.palette.success.main
                              : topic.status === 'locked'
                              ? theme.palette.text.disabled
                              : theme.palette.primary.main,
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: topic.status === 'locked' ? theme.palette.text.disabled : theme.palette.text.secondary,
                        display: 'block',
                        fontSize: '0.75rem'
                      }}
                    >
                      {topic.questionsCount} {t('learningPath.questions')} • {topic.progress}% {t('learningPath.completed')}
                    </Typography>
                  </Paper>
                </ScaleIn>
              </Box>
            ))}
          </Box>
        </Box>

        {selectedTopic && (
          <Card sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {selectedTopic.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selectedTopic.status === 'completed' && (
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label={t('learningPath.completed')} 
                      color="success" 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                  )}
                  {selectedTopic.status === 'in-progress' && (
                    <Chip 
                      icon={<PendingIcon />} 
                      label={t('learningPath.inProgress')} 
                      color="primary" 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                  )}
                  {selectedTopic.status === 'locked' && (
                    <Chip 
                      icon={<LockIcon />} 
                      label={t('learningPath.locked')} 
                      color="default" 
                      size="small" 
                      sx={{ mr: 1 }}
                    />
                  )}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">{t('learningPath.progress')}</Typography>
                    <Typography variant="body2" fontWeight="medium">{selectedTopic.progress}%</Typography>
                  </Box>
                  <Box sx={{ position: 'relative', height: 8, bgcolor: alpha(theme.palette.divider, 0.2), borderRadius: 3 }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${selectedTopic.progress}%`,
                        bgcolor: 
                          selectedTopic.status === 'completed'
                            ? theme.palette.success.main
                            : selectedTopic.status === 'locked'
                            ? theme.palette.text.disabled
                            : theme.palette.primary.main,
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>
                
                <Chip 
                  size="small" 
                  label={`${selectedTopic.questionsCount} ${t('learningPath.questions')}`} 
                  color="secondary" 
                  variant="outlined"
                />
              </Box>
              
              <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.background.default, 0.5), mb: 2, borderRadius: 2 }}>
                <Typography variant="body2" paragraph sx={{ mb: 0 }}>
                  {selectedTopic.description}
                </Typography>
              </Paper>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                {t('learningPath.dependencies')}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedTopic.dependencies.length > 0 ? (
                  selectedTopic.dependencies.map(depId => {
                    const dependentTopic = exam.topics.find(t => t.id === depId);
                    return dependentTopic ? (
                      <Chip 
                        key={depId}
                        size="small" 
                        label={dependentTopic.name} 
                        color="primary"
                        onClick={() => handleTopicClick(dependentTopic)}
                        sx={{ '&:hover': { boxShadow: 1 } }}
                      />
                    ) : null;
                  })
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t('learningPath.noDependencies')}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small"
                  disabled={selectedTopic.status === 'locked'}
                >
                  {t('learningPath.studyTopic')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>
    </FadeIn>
  );
};

export default LearningPathMap; 