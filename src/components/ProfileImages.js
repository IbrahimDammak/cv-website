import { motion } from 'framer-motion';

export default function ProfileImages({ position }) {
  return (
    <motion.div 
      className="bg-cv-light-green text-cv-dark rounded-lg shadow-lg h-full overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-full h-full">
        <img 
          src="/profilepicNEW.jpg" 
          alt="Ibrahim Dammak" 
          className="w-full h-full object-cover"
        />
        
        {/* Optional caption/overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-cv-dark bg-opacity-70 text-cv-cream p-2 text-center">
          <span className="text-sm font-medium">
            {position === "top" ? "Software Developer" : "Ibrahim Dammak"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
