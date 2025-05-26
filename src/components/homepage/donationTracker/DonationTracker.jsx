"use client"

import { useState, useEffect } from "react"
import DonationCard from "./DonationCard"

const donations = [
  {
    id: 1,
    amount: 20,
    time: "just now",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
  {
    id: 2,
    amount: 120,
    time: "just now",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
  {
    id: 3,
    amount: 55,
    time: "1 min ago",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
  {
    id: 4,
    amount: 25,
    time: "2 mins ago",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
  {
    id: 5,
    amount: 10,
    time: "3 mins ago",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
  {
    id: 6,
    amount: 75,
    time: "5 mins ago",
    donor: "Anonymous kind soul",
    location: "Rainham, United Nation",
    destination: "Suroth's Destination",
  },
]

const DonationSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === donations.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? donations.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === donations.length - 1 ? 0 : currentIndex + 1)
  }

  const getVisibleCards = () => {
    const cards = []
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % donations.length
      cards.push(donations[index])
    }
    return cards
  }

  return (
    <div className="relative">
      {/* Slider Container */}
      <div
        className="flex gap-4 transition-transform duration-500 ease-in-out overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex gap-4 min-w-full">
          {getVisibleCards().map((donation, index) => (
            <div
              key={`${donation.id}-${currentIndex}-${index}`}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <DonationCard donation={donation} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 z-10"
        aria-label="Previous donations"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200 z-10"
        aria-label="Next donations"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {donations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default DonationSlider
