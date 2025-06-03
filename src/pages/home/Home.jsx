"use client"

import { Navbar } from "@/components/header/Navbar"
import { Button } from "@/components/ui/button"



import { useState } from "react"
import { Search } from "lucide-react"
import Aurora from "@/components/background/Aurora"
import CampaignCardSection from "@/components/homepage/campaignCardSection/CampaignCardSection"
import RecommendedCauses from "@/components/homepage/RecommendedCauses/RecommendedCauses"
import Improve from "@/components/homepage/improve/Improve"
import FundraisingSection from "@/components/homepage/fundraisingSection/FundraisingSection"
import DonationTracker from "@/components/homepage/donationTracker/DonationTracker"
import Footer from "@/components/footer/Footer"
import Hero from "@/components/homepage/hero/Hero"
import InstituteSlider from "@/components/homepage/inspiringInstitutes/InspiringInstitutes"
import DonationSlider from "@/components/homepage/donationTracker/DonationTracker"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Ulama');

 const categories = [
    {
      id: 'Teachers',
      name: 'Teachers',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2v2m0-2h2m-2 0H10" />
        </svg>
      )
    },
    {
      id: 'madrasa',
      name: 'Madrasa',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'education',
      name: 'Education',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      id: 'poor',
      name: 'Poor',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        </svg>
      )
    },
    {
      id: 'orphans',
      name: 'Orphans',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'medical',
      name: 'Medical Relief',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v4m-2-2h4" />
        </svg>
      )
    },
    {
      id: 'masjid',
      name: 'Masjid',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21l4-7 4 7M3 7l9-4 9 4-9 4-9-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v4" />
          <circle cx="12" cy="2" r="1" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10v8a2 2 0 002 2h10a2 2 0 002-2v-8" />
        </svg>
      )
    },
     {
      id: 'temple ',
      name: 'Temple ',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];
  //  const categories = [
  //   { name: "Ulama", color: "bg-amber-100 text-amber-900 hover:bg-amber-200"  },
  //   { name: "Madrasah", color: "bg-emerald-100 text-emerald-900 hover:bg-emerald-200" },
  //   { name: "School", color: "bg-sky-100 text-sky-900 hover:bg-sky-200" },
  //   { name: "Poor",  color: "bg-purple-100 text-purple-900 hover:bg-purple-200" },
  //   { name: "Orphanages", color: "bg-rose-100 text-rose-900 hover:bg-rose-200" },
  //   { name: "Palestine", color: "bg-green-100 text-green-900 hover:bg-green-200" },
  // ];
  return (
    <>
      <Navbar />
      <Hero/>
        <div className="mt-2 flex flex-col items-center gap-4 lg:mt-10  ">
                <div className="text-center: text-zinc-600 lg:text-left">
                  <div className="flex justify-between items-center border-2 border-white rounded-md  pl-4 md:w-[1040px] bg-white searchShadow">
                    <div className='flex items-center'>

                      <Search className="mr-2 h-10 w-4" />
                      <input type="text" placeholder="Search" className="text-zinc-600 placeholder:text-zinc-600 focus:outline-none" />
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-4 py-6 text-white text-sm cursor-pointer">Search</Button>
                  </div>
        <div className="max-w-7xl mx-auto pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md min-h-[120px] ${
                      selectedCategory === category.name
                        // ? 'border-2 border-blue-400 bg-blue-50'
                        ? 'border border-gray-200 bg-white hover:border-gray-300'
                        : 'border border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`mb-3 ${
                      selectedCategory === category.name ? 'text-blue-500' : 'text-blue-400'
                    }`}>
                      {category.icon}
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight ${
                      selectedCategory === category.name ? 'text-gray-800' : 'text-gray-700'
                    }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
                </div>
                
              </div>
      <CampaignCardSection/>
      <RecommendedCauses/>
      <Improve/>
      <InstituteSlider/>
      <FundraisingSection/>
      <div className=" bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Generosity of the Ummah</h1>
          <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2"> ₹ 2,438 INR</div>
          <p className="text-gray-600 text-sm md:text-base">raised in the past hour</p>
        </div>

        {/* Donation Slider */}
        <DonationSlider />
      </div>
    </div>
      
      <Footer/>


    </>
  )
}
