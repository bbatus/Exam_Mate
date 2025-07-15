import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
  alpha,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { FadeIn, ScaleIn } from './UIAnimations';

// Define certification structure
interface Certification {
  id: number;
  name: string;
  provider: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  prerequisites: number[];
  leadsTo: number[];
  estimatedStudyHours: number;
  examCost: string;
  popularity: number; // 1-5
  position: { x: number; y: number };
}

// Define career path structure
interface CareerPath {
  id: number;
  name: string;
  description: string;
  certifications: Certification[];
}

interface CareerPathMapProps {
  careerPathId?: number;
}

const CareerPathMap: React.FC<CareerPathMapProps> = ({ careerPathId }) => {
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const theme = useTheme();

  // Mock data for Cloud Engineer career path
  const mockCloudEngineerPath: CareerPath = {
    id: 1,
    name: 'Cloud Engineer',
    description: 'Cloud engineers are responsible for designing, implementing, and maintaining cloud infrastructure.',
    certifications: [
      {
        id: 1,
        name: 'Google Cloud Digital Leader',
        provider: 'Google Cloud',
        level: 'beginner',
        description: 'Validates your ability to articulate the capabilities of Google Cloud core products and services and how they benefit organizations.',
        prerequisites: [],
        leadsTo: [2, 3, 7],
        estimatedStudyHours: 40,
        examCost: '$99',
        popularity: 4,
        position: { x: 150, y: 100 }
      },
      {
        id: 2,
        name: 'Google Associate Cloud Engineer',
        provider: 'Google Cloud',
        level: 'intermediate',
        description: 'Validates your ability to deploy applications, monitor operations, and maintain cloud projects on Google Cloud.',
        prerequisites: [1],
        leadsTo: [4, 5],
        estimatedStudyHours: 120,
        examCost: '$125',
        popularity: 5,
        position: { x: 350, y: 100 }
      },
      {
        id: 3,
        name: 'Google Professional Cloud Architect',
        provider: 'Google Cloud',
        level: 'advanced',
        description: 'Validates your ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions to drive business objectives.',
        prerequisites: [1, 2],
        leadsTo: [6],
        estimatedStudyHours: 200,
        examCost: '$200',
        popularity: 5,
        position: { x: 550, y: 50 }
      },
      {
        id: 4,
        name: 'Google Professional Cloud DevOps Engineer',
        provider: 'Google Cloud',
        level: 'advanced',
        description: 'Validates your ability to implement DevOps practices for Google Cloud.',
        prerequisites: [2],
        leadsTo: [6],
        estimatedStudyHours: 180,
        examCost: '$200',
        popularity: 4,
        position: { x: 550, y: 150 }
      },
      {
        id: 5,
        name: 'Google Professional Cloud Security Engineer',
        provider: 'Google Cloud',
        level: 'advanced',
        description: 'Validates your ability to secure Google Cloud workloads and infrastructure.',
        prerequisites: [2],
        leadsTo: [6],
        estimatedStudyHours: 190,
        examCost: '$200',
        popularity: 4,
        position: { x: 550, y: 250 }
      },
      {
        id: 6,
        name: 'Google Cloud Fellow',
        provider: 'Google Cloud',
        level: 'expert',
        description: 'The highest level of expertise in Google Cloud technologies.',
        prerequisites: [3, 4, 5],
        leadsTo: [],
        estimatedStudyHours: 500,
        examCost: 'By invitation',
        popularity: 5,
        position: { x: 750, y: 150 }
      },
      {
        id: 7,
        name: 'Google Cloud Generative AI Leader',
        provider: 'Google Cloud',
        level: 'intermediate',
        description: 'Validates your ability to understand and apply generative AI concepts and Google Cloud\'s gen AI offerings for business solutions.',
        prerequisites: [1],
        leadsTo: [3, 4],
        estimatedStudyHours: 80,
        examCost: '$125',
        popularity: 5,
        position: { x: 350, y: 200 }
      }
    ]
  };

  // Mock data for AWS Solutions Architect career path
  const mockAWSPath: CareerPath = {
    id: 2,
    name: 'AWS Solutions Architect',
    description: 'AWS Solutions Architects design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Cloud Practitioner',
        provider: 'Amazon Web Services',
        level: 'beginner',
        description: 'Validates cloud fluency and foundational AWS knowledge.',
        prerequisites: [],
        leadsTo: [2],
        estimatedStudyHours: 30,
        examCost: '$100',
        popularity: 5,
        position: { x: 150, y: 100 }
      },
      {
        id: 2,
        name: 'AWS Certified Solutions Architect - Associate',
        provider: 'Amazon Web Services',
        level: 'intermediate',
        description: 'Validates ability to design available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.',
        prerequisites: [1],
        leadsTo: [3],
        estimatedStudyHours: 120,
        examCost: '$150',
        popularity: 5,
        position: { x: 350, y: 100 }
      },
      {
        id: 3,
        name: 'AWS Certified Solutions Architect - Professional',
        provider: 'Amazon Web Services',
        level: 'advanced',
        description: 'Validates advanced technical skills and experience in designing distributed applications and systems on the AWS platform.',
        prerequisites: [2],
        leadsTo: [],
        estimatedStudyHours: 300,
        examCost: '$300',
        popularity: 4,
        position: { x: 550, y: 100 }
      }
    ]
  };

  // Mock career paths data
  const mockCareerPaths: Record<number, CareerPath> = {
    1: mockCloudEngineerPath,
    2: mockAWSPath
  };

  useEffect(() => {
    const fetchCareerPath = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use mock data for now
        if (careerPathId && mockCareerPaths[careerPathId]) {
          setCareerPath(mockCareerPaths[careerPathId]);
        } else {
          // Default to Cloud Engineer if no careerPathId provided
          setCareerPath(mockCareerPaths[1]);
        }
      } catch (error) {
        console.error('Error fetching career path data:', error);
        setError('Kariyer yolu bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPath();
  }, [careerPathId]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const handleCertificationClick = (certification: Certification) => {
    setSelectedCertification(certification);
  };

  // Draw connections between certifications
  const renderConnections = () => {
    if (!careerPath) return null;

    const connections: JSX.Element[] = [];

    // Draw prerequisites connections
    careerPath.certifications.forEach(cert => {
      cert.prerequisites.forEach(preId => {
        const preCert = careerPath.certifications.find(c => c.id === preId);
        if (preCert) {
          // Calculate line coordinates
          const x1 = preCert.position.x;
          const y1 = preCert.position.y;
          const x2 = cert.position.x;
          const y2 = cert.position.y;

          // Generate a unique key
          const key = `prereq-${preId}-${cert.id}`;

          connections.push(
            <g key={key}>
              <defs>
                <marker
                  id={`arrowhead-${key}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={theme.palette.primary.main}
                  />
                </marker>
              </defs>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                markerEnd={`url(#arrowhead-${key})`}
                strokeOpacity={0.7}
              />
            </g>
          );
        }
      });
    });

    return connections;
  };

  // Render stars for popularity
  const renderPopularityStars = (popularity: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= popularity ? (
          <StarIcon key={i} fontSize="small" sx={{ color: theme.palette.warning.main }} />
        ) : (
          <StarBorderIcon key={i} fontSize="small" sx={{ color: theme.palette.warning.main }} />
        )
      );
    }
    return stars;
  };

  // Get color based on certification level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return theme.palette.info.main;
      case 'intermediate':
        return theme.palette.success.main;
      case 'advanced':
        return theme.palette.warning.main;
      case 'expert':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !careerPath) {
    return (
      <Box sx={{ p: 3, bgcolor: alpha(theme.palette.error.main, 0.1), borderRadius: 2 }}>
        <Typography color="error">{error || 'Kariyer yolu bilgisi bulunamadı.'}</Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {careerPath.name} Kariyer Yolu
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Küçült">
              <IconButton onClick={handleZoomOut} size="small">
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Büyüt">
              <IconButton onClick={handleZoomIn} size="small">
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {careerPath.description}
        </Typography>

        <Box 
          sx={{ 
            position: 'relative', 
            height: '500px', 
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            overflow: 'hidden',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease',
            mb: 3
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

          {careerPath.certifications.map((cert) => (
            <Box
              key={cert.id}
              sx={{
                position: 'absolute',
                top: cert.position.y,
                left: cert.position.x,
                transform: 'translate(-50%, -50%)',
                zIndex: selectedCertification?.id === cert.id ? 10 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              <ScaleIn>
                <Paper
                  elevation={selectedCertification?.id === cert.id ? 6 : 1}
                  onClick={() => handleCertificationClick(cert)}
                  sx={{
                    p: 2,
                    width: 220, // Genişliği artırıyorum
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: `2px solid ${getLevelColor(cert.level)}`,
                    bgcolor: 
                      selectedCertification?.id === cert.id 
                        ? alpha(getLevelColor(cert.level), 0.1)
                        : alpha(theme.palette.background.paper, 0.9),
                    '&:hover': {
                      bgcolor: alpha(getLevelColor(cert.level), 0.1),
                      transform: 'scale(1.05)'
                    },
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ fontSize: '0.9rem', maxWidth: '70%' }} // Yazı boyutunu artırıyorum ve genişlik sınırı ekliyorum
                    >
                      {cert.name}
                    </Typography>
                    <Chip 
                      label={cert.level} 
                      size="small" 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.7rem', // Yazı boyutunu artırıyorum
                        bgcolor: alpha(getLevelColor(cert.level), 0.1),
                        color: getLevelColor(cert.level),
                        border: `1px solid ${getLevelColor(cert.level)}`
                      }} 
                    />
                  </Box>
                  
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ display: 'block', fontSize: '0.8rem', mb: 1 }} // Yazı boyutunu artırıyorum
                  >
                    {cert.provider}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    {renderPopularityStars(cert.popularity)}
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mt: 1, // Biraz boşluk ekliyorum
                    pt: 1, // Biraz boşluk ekliyorum
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}` // Ayırıcı çizgi ekliyorum
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        display: 'block',
                        fontSize: '0.8rem', // Yazı boyutunu artırıyorum
                        fontWeight: 'medium' // Biraz daha kalın yapıyorum
                      }}
                    >
                      {cert.estimatedStudyHours}h
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        display: 'block',
                        fontSize: '0.8rem', // Yazı boyutunu artırıyorum
                        fontWeight: 'medium' // Biraz daha kalın yapıyorum
                      }}
                    >
                      {cert.examCost}
                    </Typography>
                  </Box>
                </Paper>
              </ScaleIn>
            </Box>
          ))}
        </Box>

        {selectedCertification && (
          <Card sx={{ mt: 2, borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {selectedCertification.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {selectedCertification.provider}
                  </Typography>
                </Box>
                <Chip 
                  label={selectedCertification.level.toUpperCase()} 
                  sx={{ 
                    bgcolor: alpha(getLevelColor(selectedCertification.level), 0.1),
                    color: getLevelColor(selectedCertification.level),
                    border: `1px solid ${getLevelColor(selectedCertification.level)}`
                  }} 
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                {renderPopularityStars(selectedCertification.popularity)}
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  Popülerlik
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {selectedCertification.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Tahmini Çalışma Süresi
                  </Typography>
                  <Chip 
                    icon={<SchoolIcon />} 
                    label={`${selectedCertification.estimatedStudyHours} saat`} 
                    color="primary" 
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Sınava Hazırlan
                  </Typography>
                  <Chip 
                    label={selectedCertification.examCost} 
                    color="secondary" 
                    variant="outlined"
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Sertifika Yolu
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedCertification.prerequisites.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Ön Koşul Sertifikalar:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedCertification.prerequisites.map(preId => {
                          const preCert = careerPath.certifications.find(c => c.id === preId);
                          return preCert ? (
                            <Chip 
                              key={preId}
                              size="small" 
                              label={preCert.name} 
                              onClick={() => handleCertificationClick(preCert)}
                              sx={{ 
                                bgcolor: alpha(getLevelColor(preCert.level), 0.1),
                                color: getLevelColor(preCert.level),
                              }}
                            />
                          ) : null;
                        })}
                      </Box>
                    </Box>
                  )}
                  
                  {selectedCertification.leadsTo.length > 0 && (
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Bu Sertifikadan Sonra:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedCertification.leadsTo.map(nextId => {
                          const nextCert = careerPath.certifications.find(c => c.id === nextId);
                          return nextCert ? (
                            <Chip 
                              key={nextId}
                              size="small" 
                              label={nextCert.name} 
                              onClick={() => handleCertificationClick(nextCert)}
                              sx={{ 
                                bgcolor: alpha(getLevelColor(nextCert.level), 0.1),
                                color: getLevelColor(nextCert.level),
                              }}
                            />
                          ) : null;
                        })}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Detaylı Bilgi
              </Button>
              <Button size="small" color="secondary">
                Sınava Hazırlan
              </Button>
            </CardActions>
          </Card>
        )}
      </Paper>
    </FadeIn>
  );
};

export default CareerPathMap; 