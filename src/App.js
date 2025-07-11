import './index.css';
import './App.css';
import { useState } from 'react';
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
import Projects from './components/Projects';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


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
        duration: 0.6,
        delay: custom * 0.2, 
        ease: "easeOut"
      }
    })
  };

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

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
              
              <motion.div 
                className="cv-grid w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Profile Image */}
                <motion.div 
                  className="profile-img"
                  variants={gridItemVariants}
                  custom={0}
                >
                  <ProfileImages position="top" />
                </motion.div>
                
                <motion.div 
                  className="profile-section"
                  variants={gridItemVariants}
                  custom={1}
                >
                  <Profile />
                </motion.div>
                
                <motion.div 
                  className="experience-section"
                  variants={gridItemVariants}
                  custom={2}
                >
                  <Experience />
                </motion.div>
                
                <motion.div 
                  className="projects-section"
                  variants={gridItemVariants}
                  custom={3}
                >
                  <Projects />
                </motion.div>
                
                {/* GitHub Activity Section */}
                <motion.div 
                  className="github-activity-section"
                  variants={gridItemVariants}
                  custom={4}
                >
                  <GitHubActivity />
                </motion.div>
                
                <motion.div 
                  className="education-section"
                  variants={gridItemVariants}
                  custom={5}
                >
                  <Education />
                </motion.div>
                
                <motion.div 
                  className="skills-section"
                  variants={gridItemVariants}
                  custom={6}
                >
                  <Skills />
                </motion.div>
                
                <motion.div 
                  className="certifications-section"
                  variants={gridItemVariants}
                  custom={7}
                >
                  <Certifications />
                </motion.div>
                
                {/* Visitor Counter */}
                <motion.div 
                  className="visitor-counter-section"
                  variants={gridItemVariants}
                  custom={8}
                >
                  <VisitorCounter />
                </motion.div>
              </motion.div>

              
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