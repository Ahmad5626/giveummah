"use client"

import { useState, useEffect, use, useContext } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { Search, Filter, X, Heart, Share2, MapPin, SlidersHorizontal, Copy } from 'lucide-react'
import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AuthContext } from "@/context/auth-context"
import { baseUrl } from "@/utils/Constant"
import { Input } from "@/components/ui/input"
const SearchResults = () => {
  const {buttonData,allUserData,userData}=useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
 const [HeartUserData, setHeartUserData] = useState([])
  const [sharePopup, setSharePopup] = useState({ open: false, campaign: null })
  const [copySuccess, setCopySuccess] = useState(false)
  const [likedCampaigns, setLikedCampaigns] = useState(new Set())


// like and share funtion
  
    const handleHeartClick = async (campaign) => {
      if (!userData?._id) {
        alert("Please login to like campaigns")
        return
      }
  
      const isLiked = likedCampaigns.has(campaign._id)
  
      try {
        if (isLiked) {
          // Remove like
          const response = await fetch(`${baseUrl}/api/hearts`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userData._id,
              campaignId: campaign._id,
            }),
          })
  
          if (response.ok) {
            setLikedCampaigns((prev) => {
              const newSet = new Set(prev)
              newSet.delete(campaign._id)
              return newSet
            })
            console.log("Like removed successfully")
          }
        } else {
          // Add like
          const heartData = {
            userId: userData._id,
            campaignId: campaign._id,
            userData,
            campaignData: campaign,
            timestamp: new Date().toISOString(),
          }
  
          const response = await fetch(`${baseUrl}/api/hearts`,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(heartData),
          })
  
          if (response.ok) {
            setLikedCampaigns((prev) => new Set([...prev, campaign._id]))
            setHeartUserData((prev) => [...prev, heartData])
            console.log("Heart clicked - Data stored:", heartData)
          }
        }
      } catch (error) {
        console.error("Error handling heart click:", error)
        alert("Error updating like status")
      }
    }
  
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


  // Get query from URL
  const searchParams = new URLSearchParams(location.search)
  const initialQuery = searchParams.get("query") || ""

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [campaigns, setCampaigns] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    fundTypes: [],
    countries: [],
    amountRange: { minAmount: 0, maxAmount: 1000000 },
    statuses: [],
  })

  const [filters, setFilters] = useState({
    category: [], // Change from "all" to empty array
    fundType: "all",
    country: "all",
    minAmount: 0,
    maxAmount: 1000000,
    zakatVerified: "all",
    status: "Active",
  })

  const [loading, setLoading] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [pagination, setPagination] = useState({})

  // Fetch filter options on component mount
  useEffect(() => {
    fetchFilterOptions()
  }, [])

  // Fetch campaigns when query or filters change
  useEffect(() => {
    if (initialQuery) {
      fetchCampaigns()
    }
  }, [initialQuery, filters])

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/api/filter-options`)
      const data = await response.json()
      if (data.success) {
        setFilterOptions(data.filterOptions)
        setFilters((prev) => ({
          ...prev,
          maxAmount: data.filterOptions.amountRange.maxAmount,
        }))
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
    }
  }

  const fetchCampaigns = async (page = 1) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        query: searchTerm,
        ...filters,
        page: page.toString(),
      })

      const response = await fetch(`${baseUrl}/v1/api/search?${queryParams}`)
      const data = await response.json()

      if (data.success) {
        setCampaigns(data.campaigns)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL with search query
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
    fetchCampaigns()
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleCategoryChange = (categoryValue) => {
    setFilters((prev) => {
      const currentCategories = prev.category || []
      const isSelected = currentCategories.includes(categoryValue)
      
      if (isSelected) {
        // Remove category if already selected
        return {
          ...prev,
          category: currentCategories.filter(cat => cat !== categoryValue)
        }
      } else {
        // Add category if not selected
        return {
          ...prev,
          category: [...currentCategories, categoryValue]
        }
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      category: [], // Change from "all" to empty array
      fundType: "all",
      country: "all",
      minAmount: 0,
      maxAmount: filterOptions.amountRange.maxAmount,
      zakatVerified: "all",
      status: "Active",
    })
  }

  const CampaignCard = ({ campaign }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
        <Link to={`/campaignDetails/${campaign._id}`}>
          <div className="relative overflow-hidden h-60">
            <img
              src={campaign.featureImageUrl || "/placeholder.svg?height=200&width=300"}
              alt={campaign.campaignTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
            {campaign.zakatVerified && (
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Zakat-verified ✓
              </div>
            )}
          </div>
        </Link>

        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">
              {campaign.createdBy?.instituteName || campaign.createdBy?.fullName}
            </span>
          </div>

          <Link to={`/campaignDetails/${campaign._id}`} className="hover:text-orange-500">
            <h3 className="text-sm font-semibold line-clamp-2  mb-2">{campaign.campaignTitle}</h3>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{campaign.category}</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">{campaign.fundType}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {campaign.tagline || campaign.story?.substring(0, 100) + "..."}
          </p>

          <div className="flex justify-between text-sm text-gray-500 py-1">
            <span>{campaign.donorCount} Donors</span>
            <span>{campaign.daysLeft} days left</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 my-2">
            <div
              className="bg-gradient-to-r from-black to-yellow-400 h-2 rounded-full"
              style={{ width: `${campaign.fundingPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold">₹{campaign.goalAmount?.toLocaleString()}</p>
              <p className="text-sm text-gray-500">funded of ₹{campaign.totalFunded?.toLocaleString()}</p>
            </div>
            <Link
              to={`/donation/${campaign._id}`}
              className="bg-orange-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm transition-all duration-300"
            >
              Donate
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 pb-1">
          <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted/50 transition-all"
                        onClick={(e) => {
                          e.preventDefault()
                          handleHeartClick(campaign)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className={`w-6 h-6 transition-colors duration-200 ${
                            likedCampaigns.has(campaign._id)
                              ? "fill-red-600 text-red-600"
                              : "fill-transparent stroke-neutral-600 stroke-2"
                          }`}
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"></path>
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-muted/50 transition-all"
                        onClick={(e) => {
                          e.preventDefault()
                          handleShareClick(campaign)
                        }}
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
         
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gray-50">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl mx-4 mt-4 md:mx-6 md:mt-6 lg:mx-8 lg:mt-8">
            {/* Purple Gradient Background */}
            <div className="pages-bg text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                {/* Text Content */}
                <div className="text-white mb-8 lg:mb-0 lg:mr-8 flex-1 px-10 md:px-20 py-4 md:py-0">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">All Campaign</h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-purple-100 max-w-2xl">
                    Donate to make a difference in the lives of those in need
                  </p>

                    <Button className="bg-black text-white hover:bg-gray-800 text-[balck] font-bold font-sans rounded-full  px-8 py-6 mt-6">
                              <Link to={buttonData.discoveryButton}>
                  
                              Donate Now
                              </Link>
                            </Button>
                </div>

                {/* Hero Image */}
                <div className="flex-shrink-0 w-full lg:w-auto max-w-md lg:max-w-lg">
                  <img
                    src="/assets/Improve_the_lives_of_Ulama.jpg"
                    alt="Hands coming together in unity"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="px-4 py-8 md:px-6 md:py-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Search Input Container */}
                  <div className="flex-1 relative">
                    <form onSubmit={handleSearch} className="flex items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-lightYollowClr focus-within:border-lightYollowClr">
                      <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm md:text-base"
                      />
                      <div className="hidden md:flex items-center text-gray-400 text-sm ml-4 flex-shrink-0">
                        <button type="submit">Press Enter to search</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="px-4 md:px-6 lg:px-8 pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-3 justify-center">
                {filterOptions.categories.slice(0, 8).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:shadow-md ${
                      filters.category.includes(category)
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {filterOptions.categories.length > 8 && (
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                  >
                    +{filterOptions.categories.length - 8} More
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mx-auto px-4 sm:px-6 lg:px-18 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar Filters */}
              <div className={`lg:w-64 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button onClick={clearFilters} className="text-sm text-orange-500 hover:text-orange-600">
                      Clear All
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filterOptions.categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                    {filters.category.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {filters.category.length} selected
                      </div>
                    )}
                  </div>

                  {/* Fund Types */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Fund Types</h3>
                    <select
                      value={filters.fundType}
                      onChange={(e) => handleFilterChange("fundType", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Fund Types</option>
                      {filterOptions.fundTypes.map((fundType) => (
                        <option key={fundType} value={fundType}>
                          {fundType}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Countries */}
                  {/* <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Countries</h3>
                    <select
                      value={filters.country}
                      onChange={(e) => handleFilterChange("country", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Countries</option>
                      {filterOptions.countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div> */}

                  {/* Goal Amount Range */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Goal Amount Range</h3>
                    <div className="space-y-4">
                      {/* Min Amount Slider */}
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Min Amount</label>
                        <input
                          type="range"
                          min={filterOptions.amountRange.minAmount}
                          max={filterOptions.amountRange.maxAmount}
                          value={filters.minAmount}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (value <= filters.maxAmount) {
                              handleFilterChange("minAmount", value)
                            }
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                          style={{
                            background: `linear-gradient(to right, #f97316 0%, #f97316 ${((filters.minAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #e5e7eb ${((filters.minAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #e5e7eb 100%)`,
                          }}
                        />
                      </div>

                      {/* Max Amount Slider */}
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Max Amount</label>
                        <input
                          type="range"
                          min={filterOptions.amountRange.minAmount}
                          max={filterOptions.amountRange.maxAmount}
                          value={filters.maxAmount}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (value >= filters.minAmount) {
                              handleFilterChange("maxAmount", value)
                            }
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                          style={{
                            background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${((filters.maxAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #f97316 ${((filters.maxAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #f97316 100%)`,
                          }}
                        />
                      </div>

                      {/* Value Display */}
                      <div className="flex justify-between text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded">
                        <span>Min: ₹{Number.parseInt(filters.minAmount).toLocaleString()}</span>
                        <span>Max: ₹{Number.parseInt(filters.maxAmount).toLocaleString()}</span>
                      </div>

                      {/* Quick Preset Buttons */}
                      {/* <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            handleFilterChange("minAmount", 0)
                            handleFilterChange("maxAmount", 50000)
                          }}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                        >
                          Under ₹50K
                        </button>
                        <button
                          onClick={() => {
                            handleFilterChange("minAmount", 50000)
                            handleFilterChange("maxAmount", 100000)
                          }}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                        >
                          ₹50K-₹1L
                        </button>
                        <button
                          onClick={() => {
                            handleFilterChange("minAmount", 100000)
                            handleFilterChange("maxAmount", 500000)
                          }}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                        >
                          ₹1L-₹5L
                        </button>
                        <button
                          onClick={() => {
                            handleFilterChange("minAmount", 500000)
                            handleFilterChange("maxAmount", filterOptions.amountRange.maxAmount)
                          }}
                          className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                        >
                          Above ₹5L
                        </button>
                      </div> */}
                    </div>
                  </div>

                  {/* Zakat Verified */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Zakat Status</h3>
                    <select
                      value={filters.zakatVerified}
                      onChange={(e) => handleFilterChange("zakatVerified", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All</option>
                      <option value="true">Zakat Verified</option>
                      <option value="false">Not Zakat Verified</option>
                    </select>
                  </div>

                  {/* Status */}
                
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? `Results for "${searchTerm}"` : "All Campaigns"}
                  </h2>
                  <p className="text-gray-600">{pagination.totalCampaigns || 0} campaigns found</p>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading campaigns...</p>
                  </div>
                )}

                {/* Results */}
                {!loading && campaigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                      <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                  </div>
                ) : (
                  !loading && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Search className="w-12 h-12 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                  )
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      {pagination.hasPrev && (
                        <button
                          onClick={() => fetchCampaigns(pagination.currentPage - 1)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Previous
                        </button>
                      )}

                      <span className="px-4 py-2 bg-orange-500 text-white rounded-md">
                        {pagination.currentPage} of {pagination.totalPages}
                      </span>

                      {pagination.hasNext && (
                        <button
                          onClick={() => fetchCampaigns(pagination.currentPage + 1)}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="bg-white w-80 h-full overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                  {filters.category.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">
                      {filters.category.length} selected
                    </div>
                  )}
                </div>

                {/* Fund Types */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Fund Types</h3>
                  <select
                    value={filters.fundType}
                    onChange={(e) => handleFilterChange("fundType", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Fund Types</option>
                    {filterOptions.fundTypes.map((fundType) => (
                      <option key={fundType} value={fundType}>
                        {fundType}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Countries */}
                {/* <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Countries</h3>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange("country", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Countries</option>
                    {filterOptions.countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Goal Amount Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Goal Amount Range</h3>
                  <div className="space-y-4">
                    {/* Min Amount Slider */}
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Min Amount</label>
                      <input
                        type="range"
                        min={filterOptions.amountRange.minAmount}
                        max={filterOptions.amountRange.maxAmount}
                        value={filters.minAmount}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (value <= filters.maxAmount) {
                            handleFilterChange("minAmount", value)
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                        style={{
                          background: `linear-gradient(to right, #f97316 0%, #f97316 ${((filters.minAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #e5e7eb ${((filters.minAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #e5e7eb 100%)`,
                        }}
                      />
                    </div>

                    {/* Max Amount Slider */}
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Max Amount</label>
                      <input
                        type="range"
                        min={filterOptions.amountRange.minAmount}
                        max={filterOptions.amountRange.maxAmount}
                        value={filters.maxAmount}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value)
                          if (value >= filters.minAmount) {
                            handleFilterChange("maxAmount", value)
                          }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                        style={{
                          background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${((filters.maxAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #f97316 ${((filters.maxAmount - filterOptions.amountRange.minAmount) / (filterOptions.amountRange.maxAmount - filterOptions.amountRange.minAmount)) * 100}%, #f97316 100%)`,
                        }}
                      />
                    </div>

                    {/* Value Display */}
                    <div className="flex justify-between text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded">
                      <span>Min: ₹{Number.parseInt(filters.minAmount).toLocaleString()}</span>
                      <span>Max: ₹{Number.parseInt(filters.maxAmount).toLocaleString()}</span>
                    </div>

                    {/* Quick Preset Buttons */}
                    {/* <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          handleFilterChange("minAmount", 0)
                          handleFilterChange("maxAmount", 50000)
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                      >
                        Under ₹50K
                      </button>
                      <button
                        onClick={() => {
                          handleFilterChange("minAmount", 50000)
                          handleFilterChange("maxAmount", 100000)
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                      >
                        ₹50K-₹1L
                      </button>
                      <button
                        onClick={() => {
                          handleFilterChange("minAmount", 100000)
                          handleFilterChange("maxAmount", 500000)
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                      >
                        ₹1L-₹5L
                      </button>
                      <button
                        onClick={() => {
                          handleFilterChange("minAmount", 500000)
                          handleFilterChange("maxAmount", filterOptions.amountRange.maxAmount)
                        }}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                      >
                        Above ₹5L
                      </button>
                    </div> */}
                  </div>
                </div>

                {/* Zakat Verified */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Zakat Status</h3>
                  <select
                    value={filters.zakatVerified}
                    onChange={(e) => handleFilterChange("zakatVerified", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All</option>
                    <option value="true">Zakat Verified</option>
                    <option value="false">Not Zakat Verified</option>
                  </select>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
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

export default SearchResults