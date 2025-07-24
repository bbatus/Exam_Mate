import React from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarIcon from '@mui/icons-material/Star';

// Animasyon tanımları
const floatUp = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;

const gentleFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const FloatingIcons: React.FC = () => {
  const theme = useTheme();
  
  const icons = [
    { Icon: SchoolIcon, delay: 0 },
    { Icon: QuizIcon, delay: 2 },
    { Icon: TrendingUpIcon, delay: 4 },
    { Icon: EmojiEventsIcon, delay: 6 },
    { Icon: LightbulbIcon, delay: 8 },
    { Icon: StarIcon, delay: 10 },
  ];
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Floating Up Icons */}
      {icons.map(({ Icon, delay }, index) => (
        <Box
          key={`floating-${index}`}
          sx={{
            position: 'absolute',
            left: `${10 + index * 15}%`,
            bottom: 0,
            animation: `${floatUp} 20s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon
            sx={{
              fontSize: '2rem',
              color: theme.palette.primary.main,
              opacity: 0.3,
            }}
          />
        </Box>
      ))}
      
      {/* Gently Floating Static Icons */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          animation: `${gentleFloat} 4s ease-in-out infinite`,
        }}
      >
        <LightbulbIcon
          sx={{
            fontSize: '3rem',
            color: theme.palette.secondary.main,
            opacity: 0.2,
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          animation: `${gentleFloat} 5s ease-in-out infinite reverse`,
          animationDelay: '1s',
        }}
      >
        <EmojiEventsIcon
          sx={{
            fontSize: '2.5rem',
            color: theme.palette.primary.light,
            opacity: 0.25,
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '12%',
          animation: `${gentleFloat} 6s ease-in-out infinite`,
          animationDelay: '2s',
        }}
      >
        <StarIcon
          sx={{
            fontSize: '2rem',
            color: theme.palette.secondary.light,
            opacity: 0.3,
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          right: '20%',
          animation: `${gentleFloat} 4.5s ease-in-out infinite reverse`,
          animationDelay: '3s',
        }}
      >
        <QuizIcon
          sx={{
            fontSize: '2.8rem',
            color: theme.palette.primary.main,
            opacity: 0.2,
          }}
        />
      </Box>
    </Box>
  );
};

export default FloatingIcons;
