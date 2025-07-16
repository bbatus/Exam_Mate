/**
 * API Configuration
 * This file contains API related configuration settings
 */

// Determine the base URL for API calls based on environment
const getApiBaseUrl = () => {
  // Check if running in production (deployed site)
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // For production, use relative URL which will be handled by Nginx
    return '/api';
  }
  
  // For local development
  return 'http://localhost:5001';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function for API calls
export const fetchApi = async (endpoint: string, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  return fetch(url, options);
}; 