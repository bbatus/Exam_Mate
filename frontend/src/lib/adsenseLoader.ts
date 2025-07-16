import { publisherId } from './adConfig';

/**
 * Dynamically loads the Google AdSense script
 * This allows us to use the publisherId from our configuration
 */
export const loadAdSenseScript = () => {
  if (document.getElementById('google-adsense-script')) {
    return; // Script already loaded
  }
  
  const script = document.createElement('script');
  script.id = 'google-adsense-script';
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
  script.crossOrigin = 'anonymous';
  
  document.head.appendChild(script);
  
  console.log('AdSense script loaded');
};

/**
 * Initialize AdSense
 * Call this function in your App component
 */
export const initializeAdsense = () => {
  // Load the AdSense script
  loadAdSenseScript();
  
  // Initialize adsbygoogle
  window.adsbygoogle = window.adsbygoogle || [];
}; 