import React, { useEffect, useState } from 'react'
import { Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react"

function GivenOption() {
  const donationTiers = [
    {
      amount: 10,
      title: "Single Meal & Care Package",
      description: "Provides one person with a meal, clean water, and essential care items.",
      claimed: 690
    },
    {
      amount: 20,
      title: "Two Meals & Care Package",
      description: "Supports two individuals with meals and critical care packages.",
      claimed: 325
    },
    {
      amount: 30,
      title: "Family Meal & Care Package Bundle",
      description: "Delivers three meals and care packages to sustain a small family.",
      claimed: 392
    },
    {
      amount: 70,
      title: "Large Family Meal & Care Package Bundle",
      description: "Delivers 7 meals and care packages to sustain a large family.",
      claimed: 112
    },
    {
      amount: 100,
      title: "Ten Meals & Care Packages of Hope",
      description: "Supplies ten people with meals and comprehensive care.",
      claimed: 263
    }
  ]
 const recentSupporters = [
    { name: "Anonymous", amount: "$25.00", time: "2 hours ago" },
    { name: "Anonymous", amount: "$100.00", time: "3 hours ago" },
    { name: "Anonymous", amount: "$50.00", time: "4 hours ago" },
    { name: "Anonymous", amount: "$75.00", time: "5 hours ago" },
    { name: "Bella", amount: "$30.00", time: "6 hours ago" },
    { name: "Anonymous", amount: "$200.00", time: "7 hours ago" },
    { name: "Anonymous", amount: "$150.00", time: "8 hours ago" },
    { name: "Anonymous", amount: "$25.00", time: "9 hours ago" },
  ]

  const communities = [
    { name: "Palestine", image: "/placeholder.svg?height=40&width=40" },
    { name: "Zakat Picks", image: "/placeholder.svg?height=40&width=40" },
    { name: "Ramadan Challenge Central Ontario Picks", image: "/placeholder.svg?height=40&width=40" },
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      comment:
        "Seeing the direct impact of my donation was incredible. The transparency and immediate aid delivery gives me confidence that every dollar truly makes a difference.",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      location: "London, UK",
      rating: 5,
      comment:
        "This organization has restored my faith in charitable giving. No admin fees means my contribution goes directly to those who need it most.",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      comment:
        "The regular updates and photos showing how donations are used is amazing. I can see exactly how my contribution helped families in need.",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "3 days ago",
    },
    {
      id: 4,
      name: "David Chen",
      location: "Toronto, Canada",
      rating: 5,
      comment:
        "Quick response, transparent process, and real impact. This is how charity should work. I've become a monthly donor because of their excellent work.",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "5 days ago",
    },
    {
      id: 5,
      name: "Fatima Al-Zahra",
      location: "Dubai, UAE",
      rating: 5,
      comment:
        "The fact that 100% of donations go directly to aid is remarkable. I've never felt more confident about where my money is going.",
      avatar: "/placeholder.svg?height=50&width=50",
      date: "1 week ago",
    },
  ]

  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                For $3 a Meal, we can Feed, Hydrate and help deliver much needed items for a family in Palestine. Take part in this legacy today!
              </h1>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Support Palestinian families to ensure they have what they need to combat starvation.
              </h2>
              
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">The people of Palestine are running out of time.</p>
                <p>
                  For too long, families in Palestine have endured conflict, hunger, and displacement. Children go to sleep hungry, parents are helpless, 
                  and communities are holding on by a thread.
                </p>
                <p className="font-semibold">You can change that.</p>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://pmedia.launchgood.com/259915%2Fbody%2FUntitled_design_%2869%29.png" 
                  alt="Palestinian family with children"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-gray-700 font-medium">
                  Your $3 donation provides a meal and clean water for someone who desperately needs it. Together, we aim to 
                  deliver 1,000,000 meals to families in Palestine.
                </p>
                
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://pmedia.launchgood.com/259915%2Fbody%2FUntitled_design_%2869%29.png" 
                    alt="Community gathering with banner"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Donation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Your giving amount</h3>
                
                </div>

                {/* Donation Options */}
                <div className="space-y-4">
                  {donationTiers.map((tier, index) => (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-2xl font-bold text-gray-900">${tier.amount}</span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tier.title}
                        </h4>
                        
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tier.description}
                        </p>
                        
                        <p className="text-sm text-orange-600 font-medium">
                          {tier.claimed} claimed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Donate Button */}
                <button className="w-full bg-darkBrownClr text-white py-3 px-4 rounded-lg font-medium hover:bg-darkYollowClr transition-colors">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* second box */}
     <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                100% of Your Donation Goes Directly to the Effort
              </h1>
              <p className="text-gray-700 leading-relaxed">
                Every single dollar you donate is used to deliver immediate, life-saving aid. No admin fees, no
                cuts—just pure impact. Your generosity goes directly to the families who need it most.
              </p>
              <p className="text-gray-600 mt-2 text-sm">Here's how your $1 makes a difference for survival:</p>
            </div>

            {/* Impact Description */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Goal 1:</strong> Delivering basic food donations provides a warm, nourishing meal for a family
                fighting hunger.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                <strong>Goal 2:</strong> Providing clean water. For families without a supply of safe, drinkable water
                for hydration and cooking—essential for survival.
              </p>
            </div>

            {/* Main Image */}
            <div className="mb-6">
              <img
                src="https://pmedia.launchgood.com/259915%2Fbody%2FWhatsApp_Image_2025-03-30_at_04_57_34.jpeg"
                alt="Volunteers in high-visibility vests serving food to families in need"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Section */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Donors
              </h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-4">
                <p className="text-gray-600 text-sm mb-3">Your share could raise over $77</p>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 w-full hover:bg-gray-800 transition-colors">
                  <span>Share</span>
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Recent Supporters */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent supporters</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentSupporters.map((supporter, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Heart size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{supporter.name}</p>
                        <p className="text-sm font-semibold text-gray-900">{supporter.amount}</p>
                      </div>
                      <p className="text-xs text-gray-500">{supporter.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communities */}
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Communities</h3>
              <div className="space-y-3">
                {communities.map((community, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">{community.name}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>

    {/* review box */}

     <div className="mt-8 max-w-5xl mx-auto bg-[#f8f8f8] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Words of support</h2>
              <div className="bg-gray-50 rounded-lg p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                 
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Next review"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="text-center">
                 

                  <blockquote className="text-gray-700 text-lg italic mb-4 leading-relaxed">
                    "{reviews[currentReview].comment}"
                  </blockquote>

                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{reviews[currentReview].name}</p>
                    <p className="text-sm text-gray-600">{reviews[currentReview].location}</p>
                    <p className="text-xs text-gray-500 mt-1">{reviews[currentReview].date}</p>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default GivenOption