export default function Experience() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-cv-dark">EXPÉRIENCE PROFESSIONNELLE</h2>
      <div className="content-container flex-grow">
        <div className="mb-2">
          <strong className="text-cv-cream text-sm">Développeur Full Stack - Stagiaire</strong>
          <div className="text-xs text-cv-cream opacity-80">Ministère de la Jeunesse et des Sports (02/2025 – 06/2025)</div>
          <ul className="list-disc list-inside text-xs mt-1">
            <li>App web pour l'automatisation des emplois du temps</li>
            <li>Fonctionnalités : JWT, signature, messagerie, visualisation</li>
            <li>CI/CD avec GitHub Actions</li>
          </ul>
        </div>
        <div className="mb-2">
          <strong className="text-cv-cream text-sm">Développeur Backend - Stagiaire</strong>
          <div className="text-xs text-cv-cream opacity-80">SofiaTech (06/2024 – 07/2024)</div>
          <ul className="list-disc list-inside text-xs mt-1">
            <li>App web RH, JWT auth</li>
            <li>Simplification d'accès utilisateur (gain 10h/semaine)</li>
          </ul>
        </div>
        <div>
          <strong className="text-cv-cream text-sm">Designer Freelance</strong>
          <div className="text-xs text-cv-cream opacity-80">(2019 – présent)</div>
          <ul className="list-disc list-inside text-xs mt-1">
            <li>+30 clients, UI/UX, Identité visuelle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}