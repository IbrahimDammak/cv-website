/**
 * Configuration loader that safely handles Firebase config
 */

const getFirebaseConfig = () => {
  console.log('Loading Firebase configuration');
  
  // Debug: Log environment variables to see what's available
  console.log('Environment variables check:', {
    hasApiKey: !!process.env.REACT_APP_FIREBASE_API_KEY,
    hasAuthDomain: !!process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    hasDatabaseURL: !!process.env.REACT_APP_FIREBASE_DATABASE_URL,
    hasProjectId: !!process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // Don't log actual values for security
  });

  // Check if critical variables exist
  if (!process.env.REACT_APP_FIREBASE_API_KEY || 
      !process.env.REACT_APP_FIREBASE_DATABASE_URL || 
      !process.env.REACT_APP_FIREBASE_PROJECT_ID) {
    console.error('Critical Firebase environment variables are missing');
    return null;
  }

  try {
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };
    
    console.log('Firebase config loaded successfully');
    return config;
  } catch (error) {
    console.error('Error loading Firebase config:', error);
    return null;
  }
};

export { getFirebaseConfig };

