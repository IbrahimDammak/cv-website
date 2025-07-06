import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../index.css';

export default function AnimatedIntro({ onComplete }) {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Handle animation sequence with proper timing
  useEffect(() => {
    // Simplified timeline - only handle the intro, not the grid
    const timeline = [
      { stage: 1, delay: 500 },    // Fade in initial view
      { stage: 2, delay: 2500 },   // Show name
      { stage: 3, delay: 1500 }    // Complete and transition to App's grid
    ];
    
    let timeoutIds = [];
    
    // Create animation timeline
    let cumulativeDelay = 0;
    timeline.forEach(item => {
      cumulativeDelay += item.delay;
      const id = setTimeout(() => {
        setAnimationStage(item.stage);
      }, cumulativeDelay);
      timeoutIds.push(id);
    });
    
    // Signal completion after name animation finishes
    const completeId = setTimeout(() => {
      if (onComplete) onComplete();
    }, cumulativeDelay + 500);
    timeoutIds.push(completeId);
    
    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, [onComplete]);
  
  // Animation variants
  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  // Only render the intro animation, not the grid
  return (
    <motion.div
      className="fixed inset-0 overflow-hidden z-50"
      style={{ backgroundColor: '#FEFAE0' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-cv-dark bg-opacity-95 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Name display - centered in screen */}
      <AnimatePresence>
        {animationStage >= 2 && (
          <motion.h1
            className="text-4xl font-bold text-center px-4 font-cal absolute w-full"
            style={{ 
              color: '#f97316', 
              top: '50%', 
              left: '50%',
              x: '-50%',
              y: '-50%'
            }}
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            Hi, my name is Ibrahim Dammak
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
