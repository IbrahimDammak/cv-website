export default function Projects() {
  return (
    <div className="bg-cv-dark noise-bg blur-bg inner-glow text-cv-green p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-cv-light-green">PROJETS</h2>
      <div className="content-container flex-grow">
        <div className="mb-3">
          <strong className="text-cv-light-green text-sm md:text-base">Modèle de détection de type de tissu</strong>
          <div className="text-sm md:text-sm text-cv-green opacity-80">Hackathon Project (12/2024)</div>
          <ul className="list-disc list-inside text-sm md:text-sm mt-1">
            <li>Développement d'un système de reconnaissance de tissus basé sur l'apprentissage automatique</li>
            <li>Classification de 24 types de tissus à partir d'images</li>
            <li>Précision du modèle : 92 %</li>
            <li>Utilisation de l'augmentation de données et de l'optimisation des hyperparamètres</li>
          </ul>
          <p className="text-xs mt-1 text-cv-green opacity-70">
            <strong>Technologies:</strong> Python/PyTorch/Torchvision/NumPy/ResNet/TensorBoard/Prompt Engineering/ChatGPT
          </p>
        </div>
        
        <div>
          <strong className="text-cv-light-green text-sm md:text-base">Système de Gestion de Service Clientèle</strong>
          <div className="text-sm md:text-sm text-cv-green opacity-80">Projet académique (11/2024)</div>
          <ul className="list-disc list-inside text-sm md:text-sm mt-1">
            <li>Gestion complète du cycle de vie de la réparation : de la demande initiale à la facturation finale</li>
            <li>Interface technicien pour +200 interventions mensuelles avec catalogue de pièces</li>
            <li>Interface client intuitive pour soumission rapide ( 2 min) et suivi temps réel</li>
          </ul>
          <p className="text-xs mt-1 text-cv-green opacity-70">
            <strong>Technologies:</strong> Java/SpringBoot/JPA/Hibernate/MySQL/Maven/React.js/JavaScript/Tailwind CSS/Axios
          </p>
        </div>
      </div>
    </div>
  );
}
