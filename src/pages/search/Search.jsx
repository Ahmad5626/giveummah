"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { Search, Filter, X, Heart, Share2, MapPin, SlidersHorizontal } from 'lucide-react'
import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import { Button } from "@/components/ui/button"

const SearchResults = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
      const response = await fetch("https://give-v59n.onrender.com/v1/api/filter-options")
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

      const response = await fetch(`https://give-v59n.onrender.com/v1/api/search?${queryParams}`)
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
            <h3 className="text-sm font-semibold line-clamp-2 h-7 mb-2">{campaign.campaignTitle}</h3>
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
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <Heart className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
              <Share2 className="h-4 w-4" />
            </button>
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
                              <Link to="">
                  
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
    </>
  )
}

export default SearchResults