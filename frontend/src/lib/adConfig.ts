/**
 * AdSense Configuration
 * This file contains all the AdSense-related configuration settings.
 * Update the publisherId and adSlots with your actual AdSense values.
 */

// Your Google AdSense Publisher ID
export const publisherId = 'ca-pub-7623597044360792';

// Ad slot IDs for different positions
export const adSlots = {
  // Sidebar ads
  leftSidebar: '1234567890',
  rightSidebar: '4567890123',
  
  // Content ads
  topBanner: '2345678901',
  bottomBanner: '6789012345',
  middleBanner: '5678901234',
  
  // Page-specific ads
  examListPage: '7890123456',
  quizPage: '8901234567',
  resultsPage: '9012345678',
};

// Ad sizes for different positions
export const adSizes = {
  leaderboard: { width: '100%', height: 90 },    // 728x90
  largeRectangle: { width: '100%', height: 250 }, // 336x280
  mediumRectangle: { width: '100%', height: 250 }, // 300x250
  wideSkyscraper: { width: 160, height: 600 },   // 160x600
};

// Ad formats
export const adFormats = {
  horizontal: 'horizontal',
  rectangle: 'rectangle',
  vertical: 'vertical',
  auto: 'auto',
};

// Helper function to get ad configuration
export const getAdConfig = (position: string) => {
  switch (position) {
    case 'left':
    case 'right':
      return {
        adSlot: position === 'left' ? adSlots.leftSidebar : adSlots.rightSidebar,
        width: adSizes.wideSkyscraper.width,
        height: adSizes.wideSkyscraper.height,
        adFormat: adFormats.vertical,
      };
    case 'top':
      return {
        adSlot: adSlots.topBanner,
        width: adSizes.leaderboard.width,
        height: adSizes.leaderboard.height,
        adFormat: adFormats.horizontal,
      };
    case 'bottom':
      return {
        adSlot: adSlots.bottomBanner,
        width: adSizes.largeRectangle.width,
        height: adSizes.largeRectangle.height,
        adFormat: adFormats.rectangle,
      };
    case 'middle':
      return {
        adSlot: adSlots.middleBanner,
        width: adSizes.leaderboard.width,
        height: adSizes.leaderboard.height,
        adFormat: adFormats.horizontal,
      };
    default:
      return {
        adSlot: adSlots.middleBanner,
        width: '100%',
        height: 'auto',
        adFormat: adFormats.auto,
      };
  }
}; 