"use client"

import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"


// Simple icon components to replace lucide-react
const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const institutes = [
  {
    id: 1,
    name: "Darul Uloom Deoband",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Khanqah Darul Ehsaan",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Darul Uloom Deoband",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Khanqah Darul Ehsaan",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Darul Uloom Nadwatul Ulama",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Jamia Millia Islamia",
    subtitle: "Subtitle",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function InstituteSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4)
  const sliderRef = useRef(null)

  // Update slides to show based on viewport width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = institutes.length
  const maxIndex = totalSlides - slidesToShow

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Inspiring Institutes</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next slide">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={sliderRef}>
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            width: `${(totalSlides / slidesToShow) * 100}%`,
          }}
        >
          {institutes.map((institute) => (
            <div key={institute.id} className="px-2" style={{ width: `${100 / totalSlides}%` }}>
              <div className="flex flex-col">
                <img
                  src={institute.image || "/placeholder.svg"}
                  alt={institute.name}
                  className="w-full h-40 object-cover bg-gray-200 rounded-md mb-2"
                />
                <h3 className="font-medium text-base">{institute.name}</h3>
                <p className="text-sm text-gray-500">{institute.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
