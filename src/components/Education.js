export default function Education() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-cv-dark">ÉDUCATION</h2>
      <ul className="space-y-3">
        <li className="leading-relaxed">
          <strong className="text-cv-cream">Licence en Informatique de Gestion</strong><br />
          <span className="text-sm">FSEG Sfax — 2025</span>
        </li>
        <li className="leading-relaxed">
          <strong className="text-cv-cream">Baccalauréat</strong><br />
          <span className="text-sm">Lycée Habib Maazoun — 2022 (Mention Bien)</span>
        </li>
      </ul>
    </div>
  );
}