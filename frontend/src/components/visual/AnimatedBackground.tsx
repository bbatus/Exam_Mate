import React from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

// Animasyon tanımları
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const drift = keyframes`
  0% { transform: translateX(-100px) translateY(0px); }
  100% { transform: translateX(calc(100vw + 100px)) translateY(-50px); }
`;

const AnimatedBackground: React.FC = () => {
  const theme = useTheme();
  
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
      {/* Floating Geometric Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80px',
          height: '80px',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderRadius: '20px',
          animation: `${float} 6s ease-in-out infinite`,
          opacity: 0.3,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '60px',
          height: '60px',
          background: theme.palette.primary.light,
          borderRadius: '50%',
          animation: `${pulse} 4s ease-in-out infinite`,
          opacity: 0.4,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
          borderRadius: '50% 20% 50% 20%',
          animation: `${float} 8s ease-in-out infinite reverse`,
          opacity: 0.2,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '70px',
          height: '70px',
          background: theme.palette.secondary.light,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          animation: `${pulse} 5s ease-in-out infinite`,
          opacity: 0.3,
        }}
      />
      
      {/* Drifting Particles */}
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: `${20 + index * 15}%`,
            left: '-100px',
            width: '4px',
            height: '4px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            animation: `${drift} ${15 + index * 3}s linear infinite`,
            animationDelay: `${index * 2}s`,
            opacity: 0.6,
          }}
        />
      ))}
      
      {/* Large Background Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent 70%)`,
          borderRadius: '50%',
          animation: `${pulse} 10s ease-in-out infinite`,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '-15%',
          width: '50%',
          height: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15, transparent 70%)`,
          borderRadius: '50%',
          animation: `${pulse} 12s ease-in-out infinite reverse`,
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;
