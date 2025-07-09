import { useEffect, useRef } from 'react';
import { userTracker } from '../services/userTracking';

export const useUserTracking = () => {
  const initialized = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initializeTracking = async () => {
      if (initialized.current) return;
      
      const firebaseReady = await userTracker.initializeFirebase();
      if (firebaseReady) {
        userTracker.startTracking();
        initialized.current = true;
        
        // Send session updates every 30 seconds
        intervalRef.current = setInterval(() => {
          userTracker.sendSessionData();
        }, 30000);
      }
    };

    initializeTracking();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      userTracker.stopTracking();
    };
  }, []);

  // Send data before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      userTracker.sendSessionData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return {
    getStats: () => userTracker.getSessionStats(),
    sendUpdate: () => userTracker.sendSessionData()
  };
};
