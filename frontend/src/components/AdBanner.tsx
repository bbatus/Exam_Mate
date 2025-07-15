import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

// AdBanner component props
interface AdBannerProps {
  position: 'top' | 'middle' | 'bottom' | 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
}

/**
 * AdBanner Component
 * This component serves as a placeholder for advertisements.
 * It will be replaced with actual ad code when integration is implemented.
 */
const AdBanner: React.FC<AdBannerProps> = ({ position, size = 'medium' }) => {
  const theme = useTheme();
  
  // Define sizes based on the size prop and position
  const sizes = {
    small: { 
      height: position === 'left' || position === 'right' ? 400 : 90, 
      width: position === 'left' || position === 'right' ? 160 : '100%',
      maxWidth: position === 'left' || position === 'right' ? 160 : '100%' 
    },
    medium: { 
      height: position === 'left' || position === 'right' ? 600 : 120, 
      width: position === 'left' || position === 'right' ? 200 : '100%',
      maxWidth: position === 'left' || position === 'right' ? 200 : '100%' 
    },
    large: { 
      height: position === 'left' || position === 'right' ? 800 : 250, 
      width: position === 'left' || position === 'right' ? 250 : '100%',
      maxWidth: position === 'left' || position === 'right' ? 250 : '100%' 
    },
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        height: sizes[size].height,
        width: sizes[size].width,
        maxWidth: sizes[size].maxWidth,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.primary.dark, 0.2)
          : alpha(theme.palette.primary.light, 0.2),
        border: `1px dashed ${theme.palette.mode === 'dark' 
          ? theme.palette.primary.main 
          : theme.palette.primary.main}`,
        borderRadius: 2,
        my: position === 'left' || position === 'right' ? 0 : 2,
        mx: position === 'left' || position === 'right' ? 2 : 0,
        overflow: 'hidden',
        position: position === 'left' || position === 'right' ? 'sticky' : 'relative',
        top: position === 'left' || position === 'right' ? 80 : 'auto',
      }}
    >
      <Typography 
        variant="body2" 
        color="textSecondary"
        sx={{ 
          textAlign: 'center',
          px: 2,
          transform: position === 'left' || position === 'right' ? 'rotate(-90deg)' : 'none',
        }}
      >
        Ad Space - {position} ({size})
        <br />
        <Typography variant="caption">
          (Ad integration will be implemented later)
        </Typography>
      </Typography>
    </Paper>
  );
};

export default AdBanner; 