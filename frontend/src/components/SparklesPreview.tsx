import { SparklesCore } from "@/components/ui/sparkles";
import { Button, Typography, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

export function HeroBanner() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative h-[30rem] w-full bg-gradient-to-b from-slate-900 to-indigo-950 flex flex-col items-center justify-center overflow-hidden rounded-2xl mb-8">
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-x"></div>
      
      {/* Floating orbs for depth */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-pink-400/30 to-red-600/30 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400/30 to-blue-600/30 rounded-full blur-lg animate-ping"></div>
      
      {/* Content container */}
      <div className="relative z-20 text-center px-8 py-6 mx-4">
        <Typography 
          variant="h1" 
          className="md:text-7xl text-4xl lg:text-8xl font-bold mb-4 relative z-10"
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
            textShadow: '0 0 60px rgba(99, 102, 241, 0.8), 0 0 100px rgba(139, 92, 246, 0.6)',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}
        >
          Exam Mate
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            mx: 'auto',
            mb: 4,
            fontWeight: 400,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            position: 'relative',
            zIndex: 10
          }}
        >
          {t('home.subtitle')}
        </Typography>

        <Button 
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/learning-path')}
          sx={{ 
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed, #db2777)',
              boxShadow: '0 15px 35px rgba(99, 102, 241, 0.7)',
              transform: 'translateY(-2px)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            }
          }}
        >
          {t('home.cta')}
        </Button>
      </div>

      {/* Sparkles effect */}
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute"
        particleColor="#FFFFFF"
      />
    </div>
  );
} 