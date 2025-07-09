import React, { useState, useEffect, useCallback } from 'react';
import { getAnalyticsData, getRecentSessions, getVisitStats, getSessionUpdates, getAllSessionData } from '../../services/firebase';
import { googleAnalytics } from '../../services/googleAnalytics';
import './Dashboard.css';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [sessions, setSessions] = useState({});
  const [visitStats, setVisitStats] = useState({ total: 0, daily: {} });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('dashboard_auth') === 'true';
    if (authenticated) {
      setIsAuthenticated(true);
      googleAnalytics.trackPageView('/dashboard', 'Analytics Dashboard');
      fetchDashboardData();
    } else {
      setLoading(false);
    }

    // Cleanup on unmount
    return () => {
      if (autoRefresh) {
        setAutoRefresh(false);
      }
    };
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && isAuthenticated) {
      interval = setInterval(() => {
        fetchDashboardData();
      }, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, isAuthenticated]);

  const handleAuth = (e) => {
    e.preventDefault();
    const adminPassword = process.env.REACT_APP_DASHBOARD_PASSWORD ;
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('dashboard_auth', 'true');
      googleAnalytics.trackPageView('/dashboard', 'Analytics Dashboard');
      fetchDashboardData();
    } else {
      setAuthError('Invalid password');
      googleAnalytics.trackEvent('auth_failed', 'Security');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dashboard_auth');
    setPassword('');
    googleAnalytics.trackEvent('logout', 'Security');
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [analyticsData, allSessionsData, visitsData] = await Promise.all([
        getAnalyticsData(),
        getAllSessionData(30), // Get merged session data with duration
        getVisitStats()
      ]);

      setAnalytics(analyticsData);
      setSessions(allSessionsData);
      setVisitStats(visitsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      googleAnalytics.trackError(error);
      setAuthError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    googleAnalytics.trackEvent('auto_refresh_toggle', 'Dashboard', autoRefresh ? 'disabled' : 'enabled');
  };

  // Enhanced session stats with error handling
  const getSessionStats = useCallback(() => {
    try {
      const sessionList = Object.values(sessions);
      if (sessionList.length === 0) return { avg: 0, total: 0, active: 0 };

      // Filter sessions that have duration data
      const sessionsWithDuration = sessionList.filter(session => session.duration && session.duration > 0);
      
      if (sessionsWithDuration.length === 0) return { avg: 0, total: sessionList.length, active: 0 };

      const totalDuration = sessionsWithDuration.reduce((sum, session) => sum + (session.duration || 0), 0);
      const avgDuration = totalDuration / sessionsWithDuration.length;
      const activeSessions = sessionList.filter(session => 
        Date.now() - (session.lastActivity || session.startTime) < 300000 // 5 minutes
      ).length;

      return {
        avg: Math.round(avgDuration / 1000), // Convert to seconds
        total: sessionList.length,
        active: activeSessions
      };
    } catch (error) {
      console.error('Error calculating session stats:', error);
      return { avg: 0, total: 0, active: 0 };
    }
  }, [sessions]);

  // Enhanced daily visits with error handling
  const getDailyVisits = useCallback(() => {
    try {
      const daily = visitStats.daily || {};
      const last7Days = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        last7Days.push({
          date: dateStr,
          visits: daily[dateStr] || 0
        });
      }
      
      return last7Days;
    } catch (error) {
      console.error('Error calculating daily visits:', error);
      return [];
    }
  }, [visitStats]);

  const sessionStats = getSessionStats();
  const dailyVisits = getDailyVisits();

  if (!isAuthenticated) {
    return (
      <div className="dashboard">
        <div className="auth-container">
          <div className="auth-form">
            <h2>Dashboard Access</h2>
            <p>Please enter the password to access the analytics dashboard.</p>
            <form onSubmit={handleAuth}>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                autoFocus
              />
              {authError && <div className="auth-error">{authError}</div>}
              <button type="submit" className="auth-button">
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Fetching analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Analytics Dashboard</h1>
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="header-actions">
          <button 
            onClick={toggleAutoRefresh} 
            className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
          >
            {autoRefresh ? '⏸️ Pause' : '▶️ Auto-refresh'}
          </button>
          <button onClick={fetchDashboardData} className="refresh-btn" disabled={loading}>
            🔄 Refresh
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Status Indicator */}
      <div className="status-bar">
        <div className={`status-indicator ${autoRefresh ? 'active' : 'paused'}`}>
          <span className="status-dot"></span>
          {autoRefresh ? 'Live updating' : 'Manual refresh'}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Key Metrics */}
        <div className="metric-card">
          <h3>Total Visits</h3>
          <div className="metric-value">{visitStats.total || 0}</div>
        </div>

        <div className="metric-card">
          <h3>Active Sessions</h3>
          <div className="metric-value">{sessionStats.active}</div>
        </div>

        <div className="metric-card">
          <h3>Total Sessions</h3>
          <div className="metric-value">{sessionStats.total}</div>
        </div>

        <div className="metric-card">
          <h3>Avg Session Duration</h3>
          <div className="metric-value">{sessionStats.avg}s</div>
        </div>

        {/* Daily Visits Chart */}
        <div className="chart-card">
          <h3>Daily Visits (Last 7 Days)</h3>
          <div className="simple-bar-chart">
            {dailyVisits.map((day, index) => (
              <div key={index} className="bar-item">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${Math.max(10, (day.visits / Math.max(...dailyVisits.map(d => d.visits), 1)) * 100)}px` 
                  }}
                ></div>
                <div className="bar-label">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="bar-value">{day.visits}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="sessions-card">
          <h3>Recent Sessions</h3>
          <div className="sessions-list">
            {Object.entries(sessions).slice(0, 10).map(([id, session]) => (
              <div key={id} className="session-item">
                <div className="session-info">
                  <div className="session-id">{session.sessionId?.slice(-8) || id.slice(-8)}</div>
                  <div className="session-duration">
                    {Math.round((session.duration || 0) / 1000)}s
                  </div>
                </div>
                <div className="session-details">
                  <span className="session-movements">
                    {session.cursorMovements || 0} moves
                  </span>
                  <span className="session-time">
                    {new Date(session.startTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Info */}
        <div className="browser-card">
          <h3>Browser Information</h3>
          <div className="browser-stats">
            {Object.entries(sessions).slice(0, 5).map(([id, session]) => (
              <div key={id} className="browser-item">
                <div className="browser-info">
                  {session.userAgent ? (
                    <>
                      <div className="browser-name">
                        {session.userAgent.includes('Chrome') ? 'Chrome' :
                         session.userAgent.includes('Firefox') ? 'Firefox' :
                         session.userAgent.includes('Safari') ? 'Safari' :
                         session.userAgent.includes('Edge') ? 'Edge' : 'Other'}
                      </div>
                      <div className="viewport-size">
                        {session.viewport?.width}x{session.viewport?.height}
                      </div>
                    </>
                  ) : (
                    <div className="browser-name">Unknown</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Dashboard Analytics - Ibrahim Dammak Portfolio</p>
        <p>Data updates every 30 seconds when auto-refresh is enabled</p>
      </footer>
    </div>
  );
};

export default Dashboard;
