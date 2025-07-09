export default function Certifications() {
  return (
    <div className="bg-cv-light-green text-cv-dark p-3 md:p-4 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 text-cv-dark">CERTIFICATIONS</h2>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-cv-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Scrum Fundamentals Certified
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-cv-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Java Microservices with Spring Boot and Spring Cloud
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-cv-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Google Fundamentals of Digital Marketing
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-cv-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
          Learning JAVA 11
        </li>
      </ul>
    </div>
  );
}