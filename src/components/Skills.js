export default function Skills() {
  return (
    <div className="bg-cv-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-cv-cream">COMPÉTENCES</h2>
      <div className="content-container flex-grow text-xs md:text-sm">
        <ul className="space-y-1 md:space-y-2">
          <li><strong>Langages:</strong> Node.js, JavaScript, Java, PHP, C#, Python, Dart</li>
          <li><strong>Frameworks:</strong> Express.js, React, Spring Boot, Laravel, .NET, Flutter</li>
          <li><strong>DB:</strong> Oracle, MySQL, SQL</li>
          <li><strong>Outils:</strong> JWT, Postman, Figma, GitHub, Jira, Trello</li>
          <li><strong>Cloud & IA:</strong> Google Cloud, ChatGPT, GitHub Copilot</li>
        </ul>
      </div>
    </div>
  );
}