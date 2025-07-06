import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, increment, update } from 'firebase/database';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Visitor counter functions
export const incrementVisitorCount = async () => {
  try {
    const visitorCountRef = ref(database, 'visitorCount');
    
    // Use Firebase's atomic increment operation
    await update(ref(database), {
      visitorCount: increment(1)
    });
    
    return true;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return false;
  }
};

export const getVisitorCount = (callback) => {
  const visitorCountRef = ref(database, 'visitorCount');
  
  // Listen for changes to the visitor count
  onValue(visitorCountRef, (snapshot) => {
    const count = snapshot.val() || 0;
    callback(count);
  });
  
  return () => {
    // Return unsubscribe function
    // off(visitorCountRef);
  };
};
