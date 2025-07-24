import React from 'react';
import { Box, Typography, Card, CardContent, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import UpdateIcon from '@mui/icons-material/Update';

// Animation definitions
const cardHover = keyframes`
  0% { transform: translateY(0px); }
  100% { transform: translateY(-8px); }
`;

const iconPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const FeatureCards: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      icon: PersonOffIcon,
      title: t('features.noRegistration', 'Üyelik Gerektirmez'),
      description: t('features.noRegistrationDesc', 'Hemen kayıt olmadan sınavlara başlayabilirsiniz'),
      color: theme.palette.primary.main,
    },
    {
      icon: AnalyticsIcon,
      title: t('features.detailedAnalysis', 'Detaylı Analiz'),
      description: t('features.detailedAnalysisDesc', 'Performansınızı detaylı grafiklerle takip edin'),
      color: theme.palette.secondary.main,
    },
    {
      icon: UpdateIcon,
      title: t('features.currentQuestions', 'Güncel Sorular'),
      description: t('features.currentQuestionsDesc', 'Sürekli güncellenen soru havuzu'),
      color: theme.palette.primary.light,
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {t('features.title', 'Neden Exam Mate?')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 4,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <Card
              key={index}
              sx={{
                position: 'relative',
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`
                  : `linear-gradient(135deg, ${alpha('#ffffff', 0.9)}, ${alpha('#ffffff', 0.6)})`,
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: `1px solid ${alpha(feature.color, 0.2)}`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  animation: `${cardHover} 0.3s ease forwards`,
                  boxShadow: `0 20px 40px ${alpha(feature.color, 0.2)}`,
                  '& .feature-icon': {
                    animation: `${iconPulse} 0.6s ease infinite`,
                  },
                  '&::before': {
                    opacity: 1,
                  },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)}, transparent)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
              }}
            >
              <CardContent
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Icon Container */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    boxShadow: `0 8px 32px ${alpha(feature.color, 0.3)}`,
                  }}
                >
                  <IconComponent
                    className="feature-icon"
                    sx={{
                      fontSize: '2.5rem',
                      color: 'white',
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  {feature.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>

              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(feature.color, 0.3)}, transparent)`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: -10,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${alpha(feature.color, 0.2)}, transparent)`,
                }}
              />
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default FeatureCards;
