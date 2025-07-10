export default function Profile() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-cv-dark">
        PROFILE
      </h2>
      <div className="content-container flex-grow">
        <p className="leading-snug">
          Diplomé en Licence en Informatique de Gestion, je
          suis actuellement à la recherche d'une alternance dans le
          développement Java, notamment dans un environnement utilisant Spring
          et les bonnes pratiques Agile. Passionné par la programmation, j'ai
          déjà travaillé sur plusieurs projets backend avec Java et Spring Boot,
          en plus d'expériences solides en Node.js. Autonome, rigoureux et
          curieux, je suis prêt à m'investir pleinement dans des projets
          innovants et évoluer rapidement au sein d'une équipe dynamique.
        </p>
      </div>
    </div>
  );
}
