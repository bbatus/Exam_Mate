import React, { ReactNode } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import AdBanner from './AdBanner';

interface PageLayoutProps {
  children: ReactNode;
  showAds?: boolean;
}

/**
 * PageLayout Component
 * This component provides a consistent layout structure for pages,
 * with optional ad banners positioned at the far left and right edges of the screen.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, showAds = true }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Left Ad Banner - Fixed position at screen edge */}
      {showAds && isDesktop && (
        <Box 
          sx={{ 
            position: 'fixed',
            left: 0,
            top: 80,
            zIndex: 10,
            height: 'calc(100vh - 160px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AdBanner position="left" size="medium" />
        </Box>
      )}
      
      {/* Main Content - Centered and with consistent width */}
      <Box 
        sx={{ 
          width: '100%',
          maxWidth: 'lg',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
      
      {/* Right Ad Banner - Fixed position at screen edge */}
      {showAds && isDesktop && (
        <Box 
          sx={{ 
            position: 'fixed',
            right: 0,
            top: 80,
            zIndex: 10,
            height: 'calc(100vh - 160px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AdBanner position="right" size="medium" />
        </Box>
      )}
    </Box>
  );
};

export default PageLayout; 