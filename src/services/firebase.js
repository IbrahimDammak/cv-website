import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, increment, update } from 'firebase/database';

// Your Firebase configuration - replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDK1s-mKK0p5Q1gTI511x39fa408gdSGTk",
  authDomain: "cv-website-ibrahim.firebaseapp.com",
  databaseURL: "https://cv-website-ibrahim-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cv-website-ibrahim",
  storageBucket: "cv-website-ibrahim.firebasestorage.app",
  messagingSenderId: "915233578583",
  appId: "1:915233578583:web:d717bee92dd62b0e594d12",
  measurementId: "G-SK6N98S76E"
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
