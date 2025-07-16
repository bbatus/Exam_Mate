import { publisherId } from './adConfig';

/**
 * Dynamically loads the Google AdSense script
 * This allows us to use the publisherId from our configuration
 */
export const loadAdSenseScript = () => {
  // Check if script is already in the document (either from our code or from index.html)
  if (document.getElementById('google-adsense-script') || 
      document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    console.log('AdSense script already exists, skipping load');
    return; // Script already loaded
  }
  
  const script = document.createElement('script');
  script.id = 'google-adsense-script';
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
  script.crossOrigin = 'anonymous';
  
  document.head.appendChild(script);
  
  console.log('AdSense script loaded dynamically');
};

/**
 * Initialize AdSense
 * Call this function in your App component
 */
export const initializeAdsense = () => {
  // Load the AdSense script (if not already loaded)
  loadAdSenseScript();
  
  // Initialize adsbygoogle only once
  if (!window.adsbygoogle || window.adsbygoogle.length === 0) {
    window.adsbygoogle = window.adsbygoogle || [];
    console.log('AdSense initialized');
  }
}; 