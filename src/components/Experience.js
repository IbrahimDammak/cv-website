export default function Experience() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-cv-dark">EXPÉRIENCE PROFESSIONNELLE</h2>
      <div className="content-container flex-grow">
        <div className="mb-2">
          <strong className="text-cv-cream text-sm md:text-base">Développeur Full Stack - Stagiaire</strong>
          <div className="text-sm md:text-sm text-cv-cream opacity-80">Ministère de la Jeunesse et des Sports (02/2025 – 06/2025)</div>
          <ul className="list-disc list-inside text-sm md:text-sm mt-1">
            <li>App web pour l'automatisation des emplois du temps</li>
            <li>Fonctionnalités : JWT, signature, messagerie, visualisation</li>
            <li>CI/CD avec GitHub Actions</li>
          </ul>
        </div>
        <div className="mb-2">
          <strong className="text-cv-cream text-sm md:text-base">Développeur Backend - Stagiaire</strong>
          <div className="text-sm md:text-sm text-cv-cream opacity-80">SofiaTech (06/2024 – 07/2024)</div>
          <ul className="list-disc list-inside text-sm md:text-sm mt-1">
            <li>App web RH, JWT auth</li>
            <li>Simplification d'accès utilisateur (gain 10h/semaine)</li>
          </ul>
        </div>
        <div>
          <strong className="text-cv-cream text-sm md:text-base">Designer Freelance</strong>
          <div className="text-sm md:text-sm text-cv-cream opacity-80">(2019 – présent)</div>
          <ul className="list-disc list-inside text-sm md:text-sm mt-1">
            <li>+30 clients, UI/UX, Identité visuelle</li>
          </ul>
        </div>
      </div>
    </div>
  );
}