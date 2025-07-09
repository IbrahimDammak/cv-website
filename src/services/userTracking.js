import { getFirebaseConfig } from './configLoader';
import { googleAnalytics } from './googleAnalytics';

class UserTrackingService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.lastActivity = Date.now();
    this.cursorPositions = [];
    this.isTracking = false;
    this.database = null;
    this.maxCursorPoints = 100; // Limit stored points to prevent excessive data
    this.scrollDepth = 0;
    this.maxScrollDepth = 0;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async initializeFirebase() {
    try {
      const config = getFirebaseConfig();
      if (!config) return false;

      const { initializeApp } = await import('firebase/app');
      const { getDatabase, ref, push, set, get, increment, update } = await import('firebase/database');
      
      const app = initializeApp(config);
      this.database = getDatabase(app);
      this.firebaseRef = ref;
      this.firebasePush = push;
      this.firebaseSet = set;
      this.firebaseGet = get;
      this.firebaseIncrement = increment;
      this.firebaseUpdate = update;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Firebase for tracking:', error);
      return false;
    }
  }

  startTracking() {
    if (this.isTracking) return;
    
    this.isTracking = true;
    this.startTime = Date.now();
    this.lastActivity = Date.now();
    
    // Track cursor movement
    this.trackCursorMovement();
    
    // Track page visibility
    this.trackPageVisibility();
    
    // Track visit count
    this.trackVisitCount();
    
    // Initialize Google Analytics
    googleAnalytics.initialize();
    
    // Track page view
    googleAnalytics.trackPageView(window.location.pathname, document.title);
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Send initial session data
    this.sendSessionStart();
  }

  trackCursorMovement() {
    let throttleTimer = null;
    
    const handleMouseMove = (event) => {
      this.lastActivity = Date.now();
      
      // Throttle cursor tracking to every 500ms
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        const position = {
          x: event.clientX,
          y: event.clientY,
          timestamp: Date.now(),
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight
        };
        
        this.cursorPositions.push(position);
        
        // Keep only recent positions
        if (this.cursorPositions.length > this.maxCursorPoints) {
          this.cursorPositions.shift();
        }
        
        throttleTimer = null;
      }, 500);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Store cleanup function
    this.cleanupCursor = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }

  trackPageVisibility() {
    let hiddenTime = 0;
    let lastHiddenTime = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastHiddenTime = Date.now();
      } else {
        if (lastHiddenTime > 0) {
          hiddenTime += Date.now() - lastHiddenTime;
        }
        this.lastActivity = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Define getActiveTime as a class method
    this.getActiveTime = () => {
      const totalTime = Date.now() - this.startTime;
      const currentHiddenTime = document.hidden && lastHiddenTime > 0 
        ? Date.now() - lastHiddenTime 
        : 0;
      return Math.max(0, totalTime - hiddenTime - currentHiddenTime);
    };
    
    // Store cleanup function
    this.cleanupVisibility = () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }

  trackScrollDepth() {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      this.scrollDepth = scrollPercent;
      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent;
        
        // Track scroll milestones
        if (scrollPercent >= 25 && scrollPercent < 50) {
          googleAnalytics.trackEvent('scroll_25', 'Engagement');
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          googleAnalytics.trackEvent('scroll_50', 'Engagement');
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
          googleAnalytics.trackEvent('scroll_75', 'Engagement');
        } else if (scrollPercent >= 90) {
          googleAnalytics.trackEvent('scroll_90', 'Engagement');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    this.cleanupScroll = () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  async trackVisitCount() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const visitKey = `visit_${today}`;
    
    // Check if user already visited today
    const hasVisitedToday = sessionStorage.getItem(visitKey) === 'true';
    
    if (!hasVisitedToday && this.database) {
      try {
        // Increment daily visit count
        await this.firebaseUpdate(this.firebaseRef(this.database), {
          [`analytics/visits/daily/${today}`]: this.firebaseIncrement(1),
          [`analytics/visits/total`]: this.firebaseIncrement(1)
        });
        
        sessionStorage.setItem(visitKey, 'true');
      } catch (error) {
        console.error('Failed to track visit count:', error);
      }
    }
  }

  async sendSessionStart() {
    if (!this.database) return;
    
    try {
      const sessionData = {
        sessionId: this.sessionId,
        startTime: this.startTime,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        referrer: document.referrer || 'direct',
        language: navigator.language
      };

      const sessionsRef = this.firebaseRef(this.database, 'analytics/sessions');
      await this.firebasePush(sessionsRef, sessionData);
      
      // Track session start with Google Analytics
      googleAnalytics.trackEvent('session_start', 'User Behavior');
      googleAnalytics.setUserProperties({
        user_agent: navigator.userAgent,
        language: navigator.language,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight
      });
    } catch (error) {
      console.error('Failed to send session start:', error);
    }
  }

  async sendSessionData() {
    if (!this.database || !this.isTracking) return;
    
    try {
      const sessionDuration = this.getActiveTime();
      
      const sessionData = {
        sessionId: this.sessionId,
        duration: sessionDuration,
        cursorMovements: this.cursorPositions.length,
        lastActivity: this.lastActivity,
        endTime: Date.now(),
        // Send sample of cursor positions (not all to save space)
        cursorSample: this.cursorPositions.filter((_, index) => index % 10 === 0).slice(-10)
      };

      const sessionUpdateRef = this.firebaseRef(this.database, `analytics/sessionUpdates/${this.sessionId}`);
      await this.firebaseSet(sessionUpdateRef, sessionData);
      
      // Track engagement with Google Analytics
      googleAnalytics.trackEngagement(sessionDuration, this.maxScrollDepth);
      
      // Track session end
      googleAnalytics.trackEvent('session_end', 'User Behavior', '', Math.round(sessionDuration / 1000));
    } catch (error) {
      console.error('Failed to send session data:', error);
      googleAnalytics.trackError(error);
    }
  }

  stopTracking() {
    if (!this.isTracking) return;
    
    this.isTracking = false;
    
    // Send final session data
    this.sendSessionData();
    
    // Cleanup event listeners
    if (this.cleanupCursor) this.cleanupCursor();
    if (this.cleanupVisibility) this.cleanupVisibility();
    
    // Cleanup scroll tracking
    if (this.cleanupScroll) this.cleanupScroll();
  }

  // Get current session stats
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      duration: this.getActiveTime ? this.getActiveTime() : Date.now() - this.startTime,
      cursorMovements: this.cursorPositions.length,
      isActive: Date.now() - this.lastActivity < 30000, // Active if moved cursor in last 30s
      startTime: this.startTime
    };
  }
}

// Export singleton instance
export const userTracker = new UserTrackingService();
