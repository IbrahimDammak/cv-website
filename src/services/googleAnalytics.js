import ReactGA from 'react-ga4';

class GoogleAnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  }

  initialize() {
    if (!this.measurementId) {
      console.warn('Google Analytics Measurement ID not found');
      return false;
    }

    try {
      ReactGA.initialize(this.measurementId, {
        debug: process.env.NODE_ENV === 'development',
        trackingOptions: {
          userId: true,
        },
      });
      
      this.isInitialized = true;
      console.log('Google Analytics initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
      return false;
    }
  }

  // Track page views
  trackPageView(path, title) {
    if (!this.isInitialized) return;
    
    ReactGA.send({
      hitType: 'pageview',
      page: path,
      title: title
    });
  }

  // Track custom events
  trackEvent(action, category = 'User', label = '', value = 0) {
    if (!this.isInitialized) return;
    
    ReactGA.event({
      action,
      category,
      label,
      value
    });
  }

  // Track user engagement
  trackEngagement(sessionDuration, scrollDepth) {
    if (!this.isInitialized) return;
    
    ReactGA.event({
      action: 'engagement',
      category: 'User Behavior',
      label: 'session_engagement',
      value: Math.round(sessionDuration / 1000), // Convert to seconds
      custom_parameters: {
        session_duration: sessionDuration,
        scroll_depth: scrollDepth
      }
    });
  }

  // Track errors
  trackError(error, fatal = false) {
    if (!this.isInitialized) return;
    
    ReactGA.event({
      action: 'exception',
      category: 'Error',
      label: error.message || 'Unknown error',
      fatal
    });
  }

  // Track timing
  trackTiming(category, variable, value, label = '') {
    if (!this.isInitialized) return;
    
    ReactGA.event({
      action: 'timing_complete',
      category,
      label: `${variable}_${label}`,
      value
    });
  }

  // Set user properties
  setUserProperties(properties) {
    if (!this.isInitialized) return;
    
    ReactGA.set(properties);
  }
}

export const googleAnalytics = new GoogleAnalyticsService();
