import './index.css';
import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedIntro from './components/AnimatedIntro';
import Profile from './components/profile';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Skills from './components/Skills';
import ProfileImages from './components/ProfileImages';
import GitHubActivity from './components/GitHubActivity';
import VisitorCounter from './components/VisitorCounter';

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

  // Render the static layout if intro is not showing
  if (!showIntro) {
    return (
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
    );
  }

  // Show animated intro
  return <AnimatedIntro onComplete={handleAnimationComplete} />;
}

export default App;