import { useState, useEffect } from 'react';
import { getFirebaseConfig } from '../services/configLoader';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount
    
    const initializeCounter = async () => {
      try {
        console.log('Initializing visitor counter');
        const config = getFirebaseConfig();
        
        if (!config || !config.databaseURL) {
          console.error('Firebase config missing or incomplete');
          if (isMounted) {
            setError('Configuration issue');
            setIsLoading(false);
          }
          return;
        }
        
        // Dynamically import Firebase modules
        const { initializeApp } = await import('firebase/app');
        const { getDatabase, ref, onValue, increment, update } = await import('firebase/database');
        
        console.log('Firebase modules loaded');
        
        // Initialize Firebase
        const app = initializeApp(config);
        const database = getDatabase(app);
        
        console.log('Firebase initialized');
        
        // Function to increment the count
        const incrementCount = async () => {
          try {
            await update(ref(database), {
              visitorCount: increment(1)
            });
            console.log('Visitor count incremented');
          } catch (err) {
            console.error('Error incrementing visitor count:', err);
          }
        };

        // Get the current count
        const visitorCountRef = ref(database, 'visitorCount');
        
        console.log('Setting up listener');
        onValue(visitorCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log('Visitor count received:', data);
          if (isMounted) {
            setVisitorCount(data || 0);
            setIsLoading(false);
          }
        }, (err) => {
          console.error('Error fetching visitor count:', err);
          if (isMounted) {
            setError('Failed to fetch visitor count');
            setIsLoading(false);
          }
        });
        
        // Increment count only once per session
        if (sessionStorage.getItem('visited') !== 'true') {
          incrementCount();
          sessionStorage.setItem('visited', 'true');
        }
      } catch (err) {
        console.error('Error setting up visitor counter:', err);
        if (isMounted) {
          setError('Error initializing counter');
          setIsLoading(false);
        }
      }
    };
    
    initializeCounter();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="bg-cv-dark noise-bg blur-bg p-4 rounded-lg shadow-lg text-cv-green">
        <div className="text-center py-2">
          <div className="inline-block w-5 h-5 border-2 border-cv-light-green border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-1 text-sm">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Show an alternative message instead of hiding the component
    return (
      <div className="bg-cv-dark noise-bg blur-bg p-4 rounded-lg shadow-lg text-cv-green">
        <p className="text-sm">
          Merci d'avoir visité mon portfolio! N'hésitez pas à me contacter:
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a 
            href="mailto:contactdammakibrahim@gmail.com" 
            className="text-cv-light-green hover:underline inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
          <a 
            href="https://www.linkedin.com/in/ibrahim-damak/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cv-light-green hover:underline inline-flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cv-dark noise-bg blur-bg p-4 rounded-lg shadow-lg text-cv-green">
      <h3 className="text-cv-light-green font-bold mb-2">
        Visiteur #{visitorCount}
      </h3>
      <p className="text-sm">
        Merci d'avoir consulté mon portfolio! N'hésitez pas à me contacter:
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a 
          href="mailto:contact@ibrahimdammak.com" 
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
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}
