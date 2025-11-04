"use client"

import { useState, useEffect, useContext } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import img1 from "../../../assets/unsplash_6Aa4EeZTdqw.png"
import { AuthContext } from "@/context/auth-context"
import { Link } from "react-router-dom"
// const inspiringInstitutesData = [
//   {
//     id: 1,
//     name: "Darul Uloom Deoband",
//     category: "Ulama",
//     instituteImage: "./assets/unsplash_6Aa4EeZTdqw.png",
//   },
//   {
//     id: 2,
//     name: "Khanqah Darul Ehsaan",
//     category: "Anweria",
//     instituteImage: "./assets/unsplash_0161tDc9kjs.png",
//   },
//     {
//     id: 5,
//     name: "Jamia Islamia",
//     category: "Ulama",
//     instituteImage: "./assets/Bhumi_Puja.jpg",
//   },
//   {
//     id: 3,
//     name: "Darul Uloom Deoband",
//     category: "Ulama",
//     instituteImage: "./assets/unsplash_AEaTUnvneik.png",
//   },
//   {
//     id: 4,
//     name: "Khanqah Darul Ehsaan",
//     category: "Anweria",
//     instituteImage: "./assets/unsplash_BCF7cHvc778.png",
//   },

//   {
//     id: 6,
//     name: "Darul Ifta",
//     category: "Anweria",
//     instituteImage: "/placeholder.svg?height=200&width=300",
//   },
// ]

export default function InspiringInstitutes() {
  const {inspiringInstitutesData} = useContext(AuthContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, inspiringInstitutesData.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  return (
    <div className="bg-[url('/assets/inspiring.png')]">
  <div className="w-full  mx-auto px-4 sm:px-6 lg:px-20 md:py-20 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">Inspiring Institutes</h2>
        {/* <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium">
          View all
          <ArrowRight className="w-4 h-4" />
        </button> */}
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {inspiringInstitutesData.map((institute) => (
              <div key={institute._id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
               <Link to="/campaignDetails/6858f205e720a63f47739199" >
               {/* <Link to={institute.url} > */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={institute.instituteImage || "/placeholder.svg"}
                      alt={institute.headline}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{institute.headline}</h3>
                    <p className="text-gray-500 text-sm">{institute.subHeadline}</p>
                  </div>
                </div>
               </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  
  )
}
