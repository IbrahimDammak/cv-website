import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { incrementVisitorCount, getVisitorCount } from '../services/firebase';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Increment the count when the component mounts
    const incrementCount = async () => {
      await incrementVisitorCount();
    };
    
    // Only increment on page load, not on component re-renders
    if (sessionStorage.getItem('counted') !== 'true') {
      incrementCount();
      sessionStorage.setItem('counted', 'true');
    }
    
    // Subscribe to count updates
    const unsubscribe = getVisitorCount((count) => {
      setVisitorCount(count);
      setLoading(false);
    });
    
    return () => {
      // Cleanup subscription
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  if (loading) {
    return <div className="text-cv-green opacity-60">Loading visitor stats...</div>;
  }
  
  return (
    <motion.div 
      className="bg-cv-dark noise-bg blur-bg text-cv-green p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3 className="text-cv-light-green font-bold mb-2">
        Hey visitor #{visitorCount}!
      </h3>
      <p className="text-sm">
        Thanks for checking out my portfolio! Feel free to contact me via:
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <a 
          href="mailto:ibrahim.dammak@example.com" 
          className="text-cv-light-green hover:underline inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </a>
        <a 
          href="https://linkedin.com/in/ibrahimdammak" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cv-light-green hover:underline inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}
