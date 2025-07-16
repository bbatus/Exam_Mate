import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { publisherId, getAdConfig } from '../lib/adConfig';

interface AdProps {
  adSlot?: string;
  adFormat?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  position: 'top' | 'middle' | 'bottom' | 'left' | 'right';
}

/**
 * Advertisement Component
 * This component integrates with Google AdSense to display ads.
 * 
 * @param adSlot - The ad slot ID from Google AdSense (optional, will use default from config if not provided)
 * @param adFormat - The ad format (auto, rectangle, horizontal, vertical)
 * @param style - Additional CSS styles
 * @param width - Width of the ad container
 * @param height - Height of the ad container
 * @param position - Position of the ad for layout purposes
 */
const Advertisement: React.FC<AdProps> = ({ 
  adSlot,
  adFormat,
  style, 
  width,
  height,
  position
}) => {
  // Get default config based on position
  const defaultConfig = getAdConfig(position);
  
  // Use provided values or defaults from config
  const finalAdSlot = adSlot || defaultConfig.adSlot;
  const finalAdFormat = adFormat || defaultConfig.adFormat;
  const finalWidth = width || defaultConfig.width;
  const finalHeight = height || defaultConfig.height;
  
  // Create a unique ID for this ad instance
  const adId = `ad-${position}-${finalAdSlot}`;
  
  // Use ref to track if this ad has been initialized
  const initialized = useRef(false);
  
  useEffect(() => {
    // Only initialize once
    if (!initialized.current) {
      try {
        // AdSense kodunu yeniden çalıştır
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error('AdSense hatası:', e);
      }
    }
  }, []);

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        overflow: 'hidden',
        width: finalWidth,
        height: finalHeight,
        my: position === 'left' || position === 'right' ? 0 : 2,
        mx: position === 'left' || position === 'right' ? 2 : 0,
        position: position === 'left' || position === 'right' ? 'sticky' : 'relative',
        top: position === 'left' || position === 'right' ? 80 : 'auto',
        ...style 
      }}
    >
      <ins
        id={adId}
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
        data-ad-client={publisherId}
        data-ad-slot={finalAdSlot}
        data-ad-format={finalAdFormat}
        data-full-width-responsive="true"
      />
    </Box>
  );
};

export default Advertisement; 