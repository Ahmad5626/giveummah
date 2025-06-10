"use client"

import { useContext, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AuthContext } from "@/context/auth-context"
import { Link } from "react-router-dom"

const RecommendedCauses = () => {
  // const {recommendedCauses}=useContext(AuthContext)
  const [currentIndex, setCurrentIndex] = useState(0)

  const recommendedCauses = [
    { headline: "Livelihood for Ulama"},
    { headline: "Construction Support for Madrasas" },
    { headline: "Student Education"},
    { headline: "Help Poor"},
    { headline: "Help Orphans"},
    { headline: "Medical Relief" },
    { headline: "Construction Support for Masjids." },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= recommendedCauses.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, recommendedCauses.length - 4) : prevIndex - 1))
  }

  return (
    <div className="w-full  mx-auto px-4 sm:px-6 lg:px-20 md:py-20 ">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center sm:text-left">Recommended Causes</h2>

      <div className="relative">
        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4 sm:gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / 4)}%)`,
            }}
          >
            {recommendedCauses.map((cause, index) => (
              <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5">
               <Link to={cause.url}>
                 <div
                  className="relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    background: `linear-gradient(135deg, #E9D8A0 0%, #E2C782 50%, #C4B48A 100%)`,
                  }}
                >
                  {/* Background texture overlay */}
                  <div
                    className="absolute inset-0 opacity-20 mix-blend-multiply"
                    style={{
                      backgroundImage: `url('./assets/Mask-group.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Wavy decorative line */}
                  <div className="absolute bottom-8 left-0 right-0">
                    <svg className="w-full h-8" viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                      <path
                        d="M0 10 Q50 5 100 10 T200 10"
                        stroke="rgba(0,0,0,0.2)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2,2"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1">{cause.headline}</h3>
                    </div>

                    {/* Arrow icon */}
                    <div className="flex justify-end">
                      <div className="w-8 h-8 bg-black bg-opacity-80 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all duration-200">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
               </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center sm:justify-start gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            disabled={currentIndex >= recommendedCauses.length - 4}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecommendedCauses
