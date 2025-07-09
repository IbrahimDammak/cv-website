import './index.css';
import './App.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimatedIntro from './components/AnimatedIntro';
import Profile from './components/profile';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ProfileImages from './components/ProfileImages';
import GitHubActivity from './components/GitHubActivity';
import VisitorCounter from './components/VisitorCounter';
import { useUserTracking } from './hooks/useUserTracking';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Move TrackingDebug component outside of App component
const TrackingDebug = ({ getStats }) => {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(getStats());
    }, 5000);
    
    return () => clearInterval(interval);
  }, [getStats]);
  
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>Session: {stats.sessionId?.slice(-8)}</div>
      <div>Duration: {Math.floor((stats.duration || 0) / 1000)}s</div>
      <div>Cursor moves: {stats.cursorMovements || 0}</div>
      <div>Active: {stats.isActive ? '✓' : '✗'}</div>
    </div>
  );
};

function App() {
  // Always start with showing the intro animation
  const [showIntro, setShowIntro] = useState(true);

  // Handler for when animation completes
  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  // Animation variants for grid items
  const gridItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: custom * 0.1, 
        ease: "easeOut"
      }
    })
  };

  // Initialize user tracking
  const { getStats } = useUserTracking();

  // Show animated intro
  if (showIntro) {
    return <AnimatedIntro onComplete={handleAnimationComplete} />;
  }

  // Render the main application with routing
  return (
    <Router>
      <Routes>
        {/* Main CV Route */}
        <Route 
          path="/" 
          element={
            <div className="bg-cv-cream min-h-screen p-5">
              <motion.h1 
                className="text-4xl font-bold text-cv-green mb-5 font-cal"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Hi my name is Ibrahim Dammak
              </motion.h1>
              
              <div className="cv-grid w-full">
                {/* Profile Image */}
                <motion.div 
                  className="profile-img"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <ProfileImages position="top" />
                </motion.div>
                
                <motion.div 
                  className="profile-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <Profile />
                </motion.div>
                
                <motion.div 
                  className="experience-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <Experience />
                </motion.div>
                
                {/* GitHub Activity Section */}
                <motion.div 
                  className="github-activity-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <GitHubActivity />
                </motion.div>
                
                <motion.div 
                  className="education-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <Education />
                </motion.div>
                
                <motion.div 
                  className="skills-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <Skills />
                </motion.div>
                
                <motion.div 
                  className="certifications-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                >
                  <Certifications />
                </motion.div>
                
                {/* Visitor Counter */}
                <motion.div 
                  className="visitor-counter-section"
                  variants={gridItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                >
                  <VisitorCounter />
                </motion.div>
              </div>

              
            </div>
          } 
        />
        
        {/* Protected Dashboard Routes */}
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute requiredPassword={process.env.REACT_APP_DASHBOARD_PASSWORD}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/analytics/dashboard" 
          element={
            <ProtectedRoute requiredPassword={process.env.REACT_APP_DASHBOARD_PASSWORD}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              flexDirection: 'column',
              background: '#f8f9fa'
            }}>
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
                Go back to home
              </a>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;