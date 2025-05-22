import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RecommendedCauses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  
  const causes = [
    "Support Ulama",
    "Support School",
    "Support Palestine",
    "Support Poor",
    "Support Poor",
    // "Support Orphans",
    // "Support Refugees",
    // "Support Education",
    // "Support Healthcare"
  ];

  // Number of cards to show based on screen width
 




 

 

  return (
    <div className="md:px-20 mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Recommended Causes</h2>
        <div className="flex gap-2">
          <button 
            // onClick={handlePrev}
            // disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            // onClick={handleNext}
            // disabled={currentIndex >= totalSlides}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className='flex '>
        
          {causes.map((cause, index) => (
            <div 
              key={index} 
              className="px-2"
              style={{ width: `${100 / causes.length}%` }}
            >
              <button 
                className="w-full h-24 border border-gray-200 rounded-lg flex items-center justify-center text-center p-4 transition-all hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <span className="font-medium">{cause}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedCauses;