export default function Skills() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-cv-cream">COMPÉTENCES</h2>
      <div className="content-container flex-grow text-xs md:text-sm">
        <ul className="space-y-1 md:space-y-2">
          <li><strong>Langages de programmation:</strong> Node.js, JavaScript, PL/SQL, Java, PHP, C#, Python, Dart</li>
          <li><strong>Framework et Bibliothèque:</strong> Express.js, React, Spring Boot, Laravel, .NetFramework, Flutter</li>
          <li><strong>SGBD:</strong> ORACLE, MySql, SQL</li>
          <li><strong>Solutions Cloud:</strong> Google Cloud</li>
          <li><strong>Gestion de projet:</strong> GitHub, Jira, Trello, Scrum</li>
          <li><strong>Conception:</strong> UML</li>
          <li><strong>Assistance IA:</strong> ChatGPT, Llama 3.1, GitHub Copilot</li>
          <li><strong>Outils et Technologies:</strong> JWT, Postman, Figma, Android Studio</li>
        </ul>
      </div>
    </div>
  );
}