import { useState, useEffect } from 'react';

export default function GitHubActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const username = 'IbrahimDammak'; // Replace with your actual GitHub username
  
  useEffect(() => {
    // Set loading to false after component mounts
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  return (
    <div className="bg-cv-dark noise-bg blur-bg inner-glow text-cv-green p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-2 text-cv-light-green">ACTIVITÉ GITHUB</h2>
      
      <div className="content-container flex-grow flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="text-center py-4">
            <div className="inline-block w-6 h-6 border-2 border-cv-light-green border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-sm">Chargement des contributions...</p>
          </div>
        ) : (
          <>
            {/* GitHub Contribution Calendar */}
            <div className="mb-3 w-full overflow-hidden">
              <img 
                src={`https://ghchart.rshah.org/${username}`}
                alt="GitHub Contribution Graph"
                className="w-full"
              />
            </div>
            
            {/* GitHub Stats */}
            <div className="flex flex-wrap justify-between text-xs md:text-sm w-full">
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-light-green hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
                Profil
              </a>
              
              <a 
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-light-green hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6H4V4h16v2zm0 14H4v-1h16v1zm0-7H4v-2h16v2z"></path>
                </svg>
                Repositories
              </a>
              
              <a 
                href={`https://github.com/${username}?tab=stars`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cv-light-green hover:underline flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
                Stars
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
