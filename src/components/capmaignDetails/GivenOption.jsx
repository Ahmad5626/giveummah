import React, { useContext, useEffect, useState } from 'react'
import { Share2, Heart, ChevronLeft, ChevronRight, MapPin, Gift, Shield, Play } from "lucide-react"
import { AuthContext } from '@/context/auth-context'
import { Link, useNavigate, useParams } from 'react-router-dom'


function GivenOption() {
  const { allCampaigns, campaignDetails, setCampaignDetails, allUserData, givingLevels, setGivingLevels } = useContext(AuthContext)
  const { id } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  // console.log(id);
  useEffect(() => {
    allCampaigns.map((campaign) => {
      if (campaign._id === id) {

        setCampaignDetails(campaign);
      }
    });
    setGivingLevels(campaignDetails.givenAmount);

    setAllComments(campaignDetails.comments);


  }, [allCampaigns, campaignDetails]);
  console.log(allComments);

  // const campaignCreateUser= allUserData.find((user) => user._id === campaignDetails?.createdBy)
  // console.log(campaignCreateUser);


  // console.log(givingLevels);


  // const donationTiers = [
  //   {
  //     amount: 10,
  //     title: "Single Meal & Care Package",
  //     description: "Provides one person with a meal, clean water, and essential care items.",
  //     claimed: 690
  //   },
  //   {
  //     amount: 20,
  //     title: "Two Meals & Care Package",
  //     description: "Supports two individuals with meals and critical care packages.",
  //     claimed: 325
  //   },
  //   {
  //     amount: 30,
  //     title: "Family Meal & Care Package Bundle",
  //     description: "Delivers three meals and care packages to sustain a small family.",
  //     claimed: 392
  //   },
  //   {
  //     amount: 70,
  //     title: "Large Family Meal & Care Package Bundle",
  //     description: "Delivers 7 meals and care packages to sustain a large family.",
  //     claimed: 112
  //   },
  //   {
  //     amount: 100,
  //     title: "Ten Meals & Care Packages of Hope",
  //     description: "Supplies ten people with meals and comprehensive care.",
  //     claimed: 263
  //   }
  // ]
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


  const updateData = [
    { headline: "? 40 Families Fed — Alhamdulillah for Your Generosity! ??", subHeadline: "Alhamdulillah, because of your support, we were able to distribute food packages to 40 families in need through our Nourishing Futures program. ? package brought relief, dignity, and hope to households that are often forgotten. These are families who now have meals to eat, du’as to make, and smiles that are fueled by your kindness.This is the essence of sadaqah — giving not just to meet a need, but to uplift and honor others for the sake of Allah ﷻ" },

    { headline: "? 40 Families Fed — Alhamdulillah for Your Generosity! ??", subHeadline: "Alhamdulillah, because of your support, we were able to distribute food packages to 40 families in need through our Nourishing Futures program. ? package brought relief, dignity, and hope to households that are often forgotten. These are families who now have meals to eat, du’as to make, and smiles that are fueled by your kindness.This is the essence of sadaqah — giving not just to meet a need, but to uplift and honor others for the sake of Allah ﷻ" },

    { headline: "? 40 Families Fed — Alhamdulillah for Your Generosity! ??", subHeadline: "Alhamdulillah, because of your support, we were able to distribute food packages to 40 families in need through our Nourishing Futures program. ? package brought relief, dignity, and hope to households that are often forgotten. These are families who now have meals to eat, du’as to make, and smiles that are fueled by your kindness.This is the essence of sadaqah — giving not just to meet a need, but to uplift and honor others for the sake of Allah ﷻ" },

  ]

  // const allComments = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     location: "New York, USA",
  //     rating: 5,
  //     comment:
  //       "Seeing the direct impact of my donation was incredible. The transparency and immediate aid delivery gives me confidence that every dollar truly makes a difference.",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     date: "2 days ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Ahmed Hassan",
  //     location: "London, UK",
  //     rating: 5,
  //     comment:
  //       "This organization has restored my faith in charitable giving. No admin fees means my contribution goes directly to those who need it most.",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     date: "1 week ago",
  //   },
  //   {
  //     id: 3,
  //     name: "Maria Rodriguez",
  //     location: "Madrid, Spain",
  //     rating: 5,
  //     comment:
  //       "The regular updates and photos showing how donations are used is amazing. I can see exactly how my contribution helped families in need.",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     date: "3 days ago",
  //   },
  //   {
  //     id: 4,
  //     name: "David Chen",
  //     location: "Toronto, Canada",
  //     rating: 5,
  //     comment:
  //       "Quick response, transparent process, and real impact. This is how charity should work. I've become a monthly donor because of their excellent work.",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     date: "5 days ago",
  //   },
  //   {
  //     id: 5,
  //     name: "Fatima Al-Zahra",
  //     location: "Dubai, UAE",
  //     rating: 5,
  //     comment:
  //       "The fact that 100% of donations go directly to aid is remarkable. I've never felt more confident about where my money is going.",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     date: "1 week ago",
  //   },
  // ]

  const [currentReview, setCurrentReview] = useState(0)
    const navigator=useNavigate()


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % allComments.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= allComments.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, allComments.length - 4) : prevIndex - 1))
  }

  const handleTierClick=async (tierId) =>{
    navigator(`/donation/${campaignDetails._id}`, { state: { tierId } });

  }

  const funded = 1000
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4 bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent">
              {campaignDetails.campaignTitle}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-darkBrownClr rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-darkYollowClr rounded-full"></div>
              </div>
              <span>Organized by</span>
              {allUserData.filter((user) => user._id === campaignDetails.createdBy).map((user) => (
                <Link to={`/profile/${user._id}`} key={user._id} className="text-blue-600 font-medium">{user.instituteName ? user.instituteName : user.fullName}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Campaign Image and Details */}
            <div className="lg:col-span-2">
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Hero Image */}
                <div className="relative">
                  <img
                    src={campaignDetails.featureImageUrl}
                    alt="Children accessing clean water from a well"
                    className="w-full h-64 md:h-124 object-cover"
                  />



                </div>
              </div>
            </div>

            {/* Right Sidebar - Donation Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                {/* LaunchGood Branding */}
                <div className="text-right mb-6">
                  <span className="text-gray-400 font-light text-lg">GiveUmmah</span>
                </div>

                {/* Fundraising Progress */}
                <div className="mb-6">
                  <div className="text-3xl md:text-4xl font-bold text-darkBrownClr mb-2">₹{campaignDetails.goalAmount}</div>
                  <div className="text-sm text-gray-600 mb-4">funded of {funded}</div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-[#000000] to-[#f8bb26] h-2 rounded-full" style={{ width: `${Math.min((funded / campaignDetails.goalAmount) * 100, 100)}%` }}></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      <strong>1696</strong> Donors
                    </span>

                    <span>
                      {Math.max(Math.ceil((new Date(campaignDetails.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0)} days left
                    </span>

                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="w-full bg-darkBrownClr text-white py-3 px-4 rounded-lg font-medium hover:bg-darkYollowClr transition-colors" >
                    <Link to={`/donation/${campaignDetails._id}`}>

                      Donate
                    </Link>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span className="text-green-600">Zakat-verified</span>
                    <Shield className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Impact: {campaignDetails.location}</span>
                  </div>

                  

                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Verified for authenticity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {campaignDetails.tagline}
                </h1>
              </div>

              {/* Support Section */}
              <div className="space-y-4">
                <div
                  className="prose prose-gray max-w-none leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: campaignDetails.story }}
                />


              </div>

              {/* Images */}
              {/* <div className="space-y-6">
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
            </div> */}
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
                    {givingLevels?.map((tier, index) => (
                      <button
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group block w-full text-center"  
                        onClick={ () => handleTierClick(tier.amount) }
                      >
                        <div className="space-y-2">
                          <div className="flex justify-center items-start ">
                            <span className="text-2xl font-bold text-gray-900">₹{tier.amount}</span>
                          </div>

                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tier.headline}
                          </h4>

                          <p className="text-sm text-gray-600 leading-relaxed">
                            {tier.subHeadline}
                          </p>

                          {/* <p className="text-sm text-orange-600 font-medium">
                          {tier.claimed} claimed
                        </p> */}
                        </div>
                      </button>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Updates
              </h1>
              <div className="space-y-3 overflow-y-auto">
                {updateData.map((supporter, index) => (
                  <div key={index} className="flex items-center gap-3 shadow-sm bg-gray-100 p-3 rounded-xl">

                    <div className="flex-1 min-w-0 px-10 py-3  ">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{supporter.headline}</p>

                      </div>
                      <p className="text-xs text-gray-500">{supporter.subHeadline}</p>
                    </div>
                  </div>
                ))}
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
          <div className="relative">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-4 sm:gap-6"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {allComments?.map((cause, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <div className="text-center">
                      <div className=''>
                        {cause.comment}
                      </div>

                      <div className="text-center">
                        {/* <p className="font-semibold text-gray-900">{allComments[currentReview].name}</p> */}
                        {/* <p className="text-sm text-gray-600">{allComments[currentReview].location}</p> */}
                        {/* <p className="text-xs text-gray-500 mt-1">{allComments[currentReview].date}</p> */}
                      </div>
                    </div>
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
                disabled={currentIndex >= allComments?.length - 4}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default GivenOption