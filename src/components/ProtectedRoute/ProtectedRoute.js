import React, { useState, useEffect } from 'react';
import { googleAnalytics } from '../../services/googleAnalytics';

const ProtectedRoute = ({ children, requiredPassword, redirectTo = '/' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticated = sessionStorage.getItem('protected_auth') === 'true';
    setIsAuthenticated(authenticated);
    setLoading(false);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const adminPassword = requiredPassword || process.env.REACT_APP_ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('protected_auth', 'true');
      googleAnalytics.trackEvent('protected_access', 'Security');
    } else {
      setAuthError('Access denied');
      googleAnalytics.trackEvent('auth_failed', 'Security');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '350px',
          width: '100%'
        }}>
          <h3>Protected Area</h3>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              placeholder="Enter access code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
            {authError && (
              <div style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
                {authError}
              </div>
            )}
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
