export default function Profile() {
  return (
    <div className="bg-cv-light-green text-cv-cream p-3 md:p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-cv-dark">PROFILE</h2>
      <div className="content-container flex-grow">
        <p className="leading-snug">
          Étudiant en dernière année de Licence en Informatique de Gestion,
          actuellement à la recherche d'une alternance dans le développement Java.
          Passionné, autonome, rigoureux, curieux, avec expériences solides en Java, Spring Boot et Node.js.
        </p>
      </div>
    </div>
  );
}
