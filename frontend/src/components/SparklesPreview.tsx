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
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <Typography 
          variant="h1" 
          className="md:text-7xl text-4xl lg:text-8xl font-bold mb-4"
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(to right, #6366f1, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
            textShadow: '0 0 40px rgba(99, 102, 241, 0.5)'
          }}
        >
          Exam Mate
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: '700px',
            mx: 'auto',
            mb: 4,
            fontWeight: 400,
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
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            boxShadow: '0 10px 25px rgba(99, 102, 241, 0.5)',
            '&:hover': {
              background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              boxShadow: '0 15px 30px rgba(99, 102, 241, 0.6)',
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