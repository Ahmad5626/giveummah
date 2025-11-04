"use client"

import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"
import { useContext } from "react"
import DonationCard from "./DonationCard"
import { AuthContext } from "@/context/auth-context"

const DonationSlider = () => {
  const { paymentData } = useContext(AuthContext)

  return (
    <div className="relative">
      {/* Title & Stats */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Generosity of the Ummah
        </h1>
        <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">
          ₹{" "}
          {paymentData
            ?.filter((donation) => {
              const today = new Date()
              const donationDate = new Date(donation.date)
              return (
                donationDate.getDate() === today.getDate() &&
                donationDate.getMonth() === today.getMonth() &&
                donationDate.getFullYear() === today.getFullYear()
              )
            })
            .reduce((total, donation) => total + donation.amount, 0)}{" "}
          INR
        </div>
        <p className="text-gray-600 text-sm md:text-base">
         raised today
        </p>
      </div>

      {/* Splide Slider */}
      <Splide
        options={{
          type: "loop",
          perPage: 4,
          perMove: 1,
          gap: "1rem",
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
          pagination: true,
          arrows: true,
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
        aria-label="Donations slider"
      >
        {paymentData?.slice(-10).map((donation, index) => (
          <SplideSlide key={donation._id || index}>
            <DonationCard donation={donation} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default DonationSlider
