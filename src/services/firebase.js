import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, increment, update, get, query, orderByKey, limitToLast } from 'firebase/database';

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

// Analytics functions
export const getAnalyticsData = async () => {
  try {
    const analyticsRef = ref(database, 'analytics');
    const snapshot = await get(analyticsRef);
    return snapshot.val() || {};
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {};
  }
};

export const getRecentSessions = async (limit = 10) => {
  try {
    const sessionsRef = ref(database, 'analytics/sessions');
    const recentQuery = query(sessionsRef, orderByKey(), limitToLast(limit));
    const snapshot = await get(recentQuery);
    return snapshot.val() || {};
  } catch (error) {
    console.error('Error fetching recent sessions:', error);
    return {};
  }
};

export const getVisitStats = async () => {
  try {
    const visitsRef = ref(database, 'analytics/visits');
    const snapshot = await get(visitsRef);
    return snapshot.val() || { total: 0, daily: {} };
  } catch (error) {
    console.error('Error fetching visit stats:', error);
    return { total: 0, daily: {} };
  }
};

// Enhanced analytics functions for dashboard
export const getDashboardStats = async () => {
  try {
    const [analytics, sessions, visits] = await Promise.all([
      getAnalyticsData(),
      getRecentSessions(50),
      getVisitStats()
    ]);

    return {
      analytics,
      sessions,
      visits,
      summary: {
        totalSessions: Object.keys(sessions).length,
        totalVisits: visits.total,
        avgSessionDuration: calculateAvgSessionDuration(sessions),
        activeSessions: countActiveSessions(sessions)
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};

const calculateAvgSessionDuration = (sessions) => {
  const sessionList = Object.values(sessions);
  if (sessionList.length === 0) return 0;
  
  const totalDuration = sessionList.reduce((sum, session) => sum + (session.duration || 0), 0);
  return Math.round(totalDuration / sessionList.length);
};

const countActiveSessions = (sessions) => {
  const now = Date.now();
  return Object.values(sessions).filter(session => 
    now - (session.lastActivity || session.startTime) < 300000 // 5 minutes
  ).length;
};

export const getSessionsByTimeRange = async (startDate, endDate) => {
  try {
    const sessionsRef = ref(database, 'analytics/sessions');
    const snapshot = await get(sessionsRef);
    const allSessions = snapshot.val() || {};
    
    const filteredSessions = Object.entries(allSessions).filter(([_, session]) => {
      const sessionTime = session.startTime;
      return sessionTime >= startDate && sessionTime <= endDate;
    });
    
    return Object.fromEntries(filteredSessions);
  } catch (error) {
    console.error('Error fetching sessions by time range:', error);
    return {};
  }
};

export const getSessionUpdates = async (limit = 20) => {
  try {
    const sessionUpdatesRef = ref(database, 'analytics/sessionUpdates');
    const recentQuery = query(sessionUpdatesRef, orderByKey(), limitToLast(limit));
    const snapshot = await get(recentQuery);
    return snapshot.val() || {};
  } catch (error) {
    console.error('Error fetching session updates:', error);
    return {};
  }
};

// Enhanced function to get all session data including updates
export const getAllSessionData = async (limit = 50) => {
  try {
    const [sessions, sessionUpdates] = await Promise.all([
      getRecentSessions(limit),
      getSessionUpdates(limit)
    ]);

    // Merge session data with updates
    const merged = { ...sessions };
    Object.entries(sessionUpdates).forEach(([sessionId, updateData]) => {
      if (merged[sessionId]) {
        merged[sessionId] = { ...merged[sessionId], ...updateData };
      } else {
        merged[sessionId] = updateData;
      }
    });

    return merged;
  } catch (error) {
    console.error('Error fetching all session data:', error);
    return {};
  }
};
