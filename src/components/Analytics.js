import { useState, useEffect } from 'react';
import { getAnalyticsData, getVisitStats, getRecentSessions } from '../services/firebase';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [analyticsData, visitStats, recentSessions] = await Promise.all([
          getAnalyticsData(),
          getVisitStats(),
          getRecentSessions(5)
        ]);

        setAnalytics({
          visits: visitStats,
          sessions: recentSessions,
          raw: analyticsData
        });
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className="p-4">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="p-4">Failed to load analytics</div>;
  }

  return (
    <div className="p-4 bg-cv-dark text-cv-green rounded-lg">
      <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-cv-green text-cv-dark p-3 rounded">
          <h3 className="font-bold">Visit Statistics</h3>
          <p>Total Visits: {analytics.visits.total || 0}</p>
          <p>Today: {analytics.visits.daily?.[new Date().toISOString().split('T')[0]] || 0}</p>
        </div>
        
        <div className="bg-cv-light-green text-cv-dark p-3 rounded">
          <h3 className="font-bold">Recent Sessions</h3>
          <p>Active Sessions: {Object.keys(analytics.sessions || {}).length}</p>
        </div>
      </div>
    </div>
  );
}
