import React from 'react';
import { Box, Typography, Button, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Animasyon tanımları
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px ${alpha('#6366f1', 0.3)}; }
  50% { box-shadow: 0 0 40px ${alpha('#6366f1', 0.6)}, 0 0 60px ${alpha('#10b981', 0.3)}; }
`;

const GlassmorphismHero: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 6,
        overflow: 'hidden',
      }}
    >
      {/* Glassmorphism Container */}
      <Box
        sx={{
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.1)}, ${alpha(theme.palette.background.paper, 0.05)})`
            : `linear-gradient(135deg, ${alpha('#ffffff', 0.25)}, ${alpha('#ffffff', 0.1)})`,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          padding: { xs: 4, md: 6 },
          maxWidth: '800px',
          width: '90%',
          textAlign: 'center',
          animation: `${glow} 4s ease-in-out infinite`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, transparent 30%, ${alpha(theme.palette.primary.main, 0.1)} 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: `${shimmer} 3s ease-in-out infinite`,
            borderRadius: '24px',
            zIndex: -1,
          },
        }}
      >
        {/* Hero Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              mb: 3,
              animation: `${glow} 2s ease-in-out infinite alternate`,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
          </Box>
          
          {/* Main Title */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {t('hero.title', 'Sertifika Sınavlarına Hazırlanın')}
          </Typography>
          
          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            {t('hero.subtitle', 'Üyelik gerektirmeden, hemen pratik yapın')}
          </Typography>
          
          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('hero.cta', 'Sınavları Keşfet')}
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/analytics')}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backdropFilter: 'blur(10px)',
                background: alpha(theme.palette.background.paper, 0.1),
                '&:hover': {
                  transform: 'translateY(-2px)',
                  background: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.light,
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('hero.analytics', 'Analitikleri Gör')}
            </Button>
          </Box>
        </Box>
        
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: theme.palette.secondary.main,
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -5,
            left: -5,
            width: 15,
            height: 15,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            opacity: 0.4,
          }}
        />
      </Box>
    </Box>
  );
};

export default GlassmorphismHero;
