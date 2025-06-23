import React, { useContext, useEffect, useState } from 'react'
import { Share2, Heart, ChevronLeft, ChevronRight, MapPin, Gift, Shield, Play, Copy } from "lucide-react"
import { AuthContext } from '@/context/auth-context'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Button } from '../ui/button'


function GivenOption() {
  const { allCampaigns, campaignDetails, setCampaignDetails, allUserData, givingLevels, setGivingLevels,givenAmountData, setGivenAmountData } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
   const [sharePopup, setSharePopup] = useState({ open: false, campaign: null })
    const [copySuccess, setCopySuccess] = useState(false)


     const handleShareClick = (campaign) => {
    setSharePopup({ open: true, campaign })
  }

  const generateShareUrl = (campaign) => {
    return `${window.location.origin}/campaignDetails/${campaign._id}`
  }

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnWhatsApp = (url, title) => {
    const text = `Check out this fundraising campaign: ${title}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
  }

  const shareOnFacebook = (url) => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareOnTwitter = (url, title) => {
    const text = `Check out this fundraising campaign: ${title}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }


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


  const handleTierClick = (tier) => {
    setGivenAmountData(tier);
navigate(`/donation/${id}`)
  }
  // console.log(givenAmountData);
  
 const [currentIndex, setCurrentIndex] = useState(0)
   const [itemsPerView, setItemsPerView] = useState(4)
 
   useEffect(() => {
     const handleResize = () => {
       if (window.innerWidth < 640) {
         setItemsPerView(1)
       } else if (window.innerWidth < 768) {
         setItemsPerView(1)
       } else if (window.innerWidth < 1024) {
         setItemsPerView(1)
       } else {
         setItemsPerView(1)
       }
     }
 
     handleResize()
     window.addEventListener("resize", handleResize)
     return () => window.removeEventListener("resize", handleResize)
   }, [])
 
   const maxIndex = Math.max(0, allComments?.length - itemsPerView)
 
   const nextSlide = () => {
     setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
   }
 
   const prevSlide = () => {
     setCurrentIndex((prev) => Math.max(prev - 1, 0))
   }
 
   const goToSlide = (index) => {
     setCurrentIndex(Math.min(index, maxIndex))
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
                  <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                   onClick={(e) => {
                          e.preventDefault()
                          handleShareClick(campaignDetails)
                        }}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <Link to={`/donation/${campaignDetails._id}`}>
                  <button className="w-full bg-darkBrownClr text-white py-3 px-4 rounded-lg font-medium hover:bg-darkYollowClr transition-colors" >
                    

                      Donate
                    
                  </button>
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="space-y-3 text-sm">
                  
                    

                    {campaignDetails.zakatVerified ? (
                      <>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-gray-400" />
                      <span className="text-green-600">Zakat-verified</span>
                       <Shield className="w-4 h-4 text-gray-400" />
                  </div>
                      </>
                    ) : (
                      <></>
                    )
                    }
                    
                   

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
                  <Link to={`/donation/${campaignDetails._id}`}>
                  <button className="w-full bg-darkBrownClr text-white py-3 px-4 rounded-lg font-medium hover:bg-darkYollowClr transition-colors">
                   

                      Donate
                    
                  </button>
                  </Link>
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
                {campaignDetails.updates?.map((supporter, index) => (
                  <div key={index} className="flex items-center gap-3 shadow-sm bg-gray-100 p-3 rounded-xl">

                    <div className="flex-1 min-w-0 px-10 py-3  ">
                      {/* <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{supporter.story}</p>

                      </div> */}
                      <p className="text-xs text-gray-500">{supporter.story}</p>

                      <div className='my-10'>
                        {supporter.images?.map((image, index) => (
                          <img key={index} src={image} alt={`Update ${index + 1}`} className="w-64 h-64   object-fill mt-2" />
                        ))}
                      </div>
                      <div className='mt-10 text-xl'>
                       <a href={supporter.videoUrl}> {supporter.videoUrl}</a>
                      </div>
                      
                   
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
              {/* <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-4">
                  <p className="text-gray-600 text-sm mb-3">Your share could raise over $77</p>
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 w-full hover:bg-gray-800 transition-colors">
                    <span>Share</span>
                    <Share2 size={16} />
                  </button>
                </div>
              </div> */}

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
             {allComments?.map((cause, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <div className="text-center">
                      <div className=''>
                        {cause.comment}
                      </div>

                      <div className="text-center">
                        
                      </div>
                    </div>
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

            {/* Navigation Arrows */}
           
          </div>


        </div>
      </div>

        {/* Share Popup Dialog */}
      <Dialog open={sharePopup.open} onOpenChange={(open) => setSharePopup({ open, campaign: null })}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Share Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {sharePopup.campaign && (
              <>
                <div className="flex items-center space-x-2">
                  <Input value={generateShareUrl(sharePopup.campaign)} readOnly className="flex-1" />
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(generateShareUrl(sharePopup.campaign))}
                    className="shrink-0"
                  >
                    {copySuccess ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-green-50 hover:bg-green-100 border-green-200"
                    onClick={() =>
                      shareOnWhatsApp(generateShareUrl(sharePopup.campaign), sharePopup.campaign.campaignTitle)
                    }
                  >
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    <span className="text-xs">WhatsApp</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-blue-50 hover:bg-blue-100 border-blue-200"
                    onClick={() => shareOnFacebook(generateShareUrl(sharePopup.campaign))}
                  >
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-xs">Facebook</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-20 bg-sky-50 hover:bg-sky-100 border-sky-200"
                    onClick={() =>
                      shareOnTwitter(generateShareUrl(sharePopup.campaign), sharePopup.campaign.campaignTitle)
                    }
                  >
                    <svg className="w-6 h-6 text-sky-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span className="text-xs">Twitter</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GivenOption