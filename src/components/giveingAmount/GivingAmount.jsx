"use client"

import { AuthContext } from "@/context/auth-context"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "../ui/select"
import { toast } from "sonner"

const GivingAmount = () => {
  const { id } = useParams()
  const {
    allCampaigns,
    campaignDetails,
    setCampaignDetails,
    allUserData,
    handleCreateComment,
    givingLevels,
    setGivingLevels,
    givenAmountData,
  } = useContext(AuthContext)
  console.log(givenAmountData)

  // Calculate initial tip based on default amount
  const initialAmount = givenAmountData
  const initialTip = (initialAmount * 0.1).toFixed(2) // 10% of 20 = 2.00

  const [customAmount, setCustomAmount] = useState(givenAmountData)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [currency, setCurrency] = useState("INR")
  const [isZakat, setIsZakat] = useState(false)
  const [selectedTip, setSelectedTip] = useState(null)
  const [tip, setTip] = useState(Number.parseFloat(initialTip)) // Initialize with 10% of default amount
  const [customTip, setCustomTip] = useState(initialTip) // Initialize with 10% of default amount
  const [paymentMethod, setPaymentMethod] = useState("googlepay")
  const [shareEmail, setShareEmail] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [supportMessage, setSupportMessage] = useState("")
  const [showCustomAmount, setShowCustomAmount] = useState(false)
  const [showHelpSection, setShowHelpSection] = useState(true) // Show help section by default
  const [sliderValue, setSliderValue] = useState(10) // Default to 10%

  // Common amount options
  const commonAmounts = [50, 100, 200, 500, 1000]
  const tipAmounts = [5, 10, 15, 20]
  const maxMessageLength = 500

  const handleTipSelect = (amount) => {
    setSelectedTip(amount)
    setTip(amount)
    setCustomTip("")
    setShowCustomAmount(false)

    // Update slider based on selected tip
    const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    if (baseAmount > 0) {
      const percentage = (amount / baseAmount) * 100
      setSliderValue(Math.min(percentage, 100))
    }
  }

  const handleCustomAmount = () => {
    setShowCustomAmount(true)
    setSelectedTip(null)
  }

  const handleCustomTipChange = (value) => {
    setCustomTip(value)
    setTip(Number.parseFloat(value) || 0)
    setSelectedTip(null)

    // Update slider based on custom tip
    const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    if (baseAmount > 0) {
      const percentage = ((Number.parseFloat(value) || 0) / baseAmount) * 100
      setSliderValue(Math.min(percentage, 100))
    }
  }

  const handleSliderChange = (e) => {
    const percentage = Number.parseFloat(e.target.value)
    setSliderValue(percentage)

    // Calculate tip based on percentage
    const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    const newTip = (baseAmount * (percentage / 100)).toFixed(2)

    setTip(Number.parseFloat(newTip))
    setCustomTip(newTip)
    setSelectedTip(null)
  }

  const handleCommonAmountSelect = (amount) => {
    setCustomAmount(amount.toString())
    setSelectedLevel(null)
    setShowHelpSection(true)
    // Auto-set 10% tip for common amounts
    const autoTip = (amount * 0.1).toFixed(2)
    setTip(Number.parseFloat(autoTip))
    setSelectedTip(null)
    setCustomTip(autoTip)
    setSliderValue(10) // Set slider to 10%
  }

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
    setCustomAmount(level.amount.toString())
    setShowHelpSection(true)
    // Auto-set 10% tip when selecting giving level
    const autoTip = (level.amount * 0.1).toFixed(2)
    setTip(Number.parseFloat(autoTip))
    setSelectedTip(null)
    setCustomTip(autoTip)
    setSliderValue(10) // Set slider to 10%
  }

  const calculateTotal = () => {
    const amount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    const tipAmount = selectedTip || Number.parseFloat(customTip) || 0
    const total = (amount + tipAmount).toFixed(2)
    return total
  }

  const getDisplayAmount = () => {
    return selectedLevel ? selectedLevel.amount.toFixed(2) : customAmount
  }

  // Calculate actual tip percentage of the donation amount
  const getTipPercentage = () => {
    const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    const actualTip = selectedTip || Number.parseFloat(customTip) || 0

    if (baseAmount === 0) return 0
    return (actualTip / baseAmount) * 100
  }

  // Get 10% target amount for display
  const getTenPercentAmount = () => {
    const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
    return (baseAmount * 0.1).toFixed(2)
  }

  // Get current tip amount
  const getCurrentTipAmount = () => {
    return (selectedTip || Number.parseFloat(customTip) || 0).toFixed(2)
  }

  const handleGiveNow = () => {
    const token = localStorage.getItem("token")
    if(!token) {
      toast.error("Please login to give now!")
      return
    }
    const total = calculateTotal()
    console.log("Total Amount:", total)
    console.log("Base Amount:", getDisplayAmount())
    console.log("Tip Amount:", getCurrentTipAmount())
    console.log("Tip Percentage:", getTipPercentage().toFixed(2) + "%")
    handleCreateComment({ comment: supportMessage }, campaignDetails._id)
  }

  const location = useLocation()
  const state = location.state

  useEffect(() => {
    // Show help section when a giving level is selected or custom amount is entered
    if (selectedLevel || Number.parseFloat(customAmount) > 0) {
      setShowHelpSection(true)
    }
  }, [selectedLevel, customAmount])

  useEffect(() => {
    allCampaigns.map((campaign) => {
      if (campaign._id === id) {
        setCampaignDetails(campaign)
      }
    })
    setGivingLevels(campaignDetails.givenAmount)
  }, [allCampaigns, campaignDetails, id])

  return (
    <>
      {/* <UpperPage/> */}
      <div className="max-w-7xl mx-auto mt-10 p-10 md:py-10 md:px-0 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Donation Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Support{" "}
                <span className="font-semibold text-gray-800 underline cursor-pointer">
                  {campaignDetails.campaignTitle}
                </span>
              </p>
              <p className="text-sm">
                <span>Organized by </span>
                {allUserData
                  .filter((user) => user._id === campaignDetails.createdBy)
                  .map((user) => (
                    <Link to={`/profile/${user._id}`} key={user._id} className="text-blue-600 font-medium">
                      {user.instituteName ? user.instituteName : user.fullName}
                    </Link>
                  ))}
              </p>
            </div>

            {/* Custom Amount Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Your giving amount</h3>
              <p className="text-sm text-gray-600">Enter a custom amount</p>

              <div className="items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <span className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-50">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedLevel(null)
                      // Auto-set 10% tip for custom amount
                      const amount = Number.parseFloat(e.target.value) || 0
                      if (amount > 0) {
                        const autoTip = (amount * 0.1).toFixed(2)
                        setTip(Number.parseFloat(autoTip))
                        setCustomTip(autoTip)
                        setSelectedTip(null)
                        setSliderValue(10) // Set slider to 10%
                      } else {
                        setTip(0)
                        setCustomTip("")
                        setSliderValue(0)
                      }
                    }}
                    className="px-4 py-3 text-lg font-medium text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="">
            <p className="text-lg  py-3 font-bold"> Define the giving types</p>
              

               <Select
                      
                    >
                      <SelectTrigger className="w-full h-14">
                        <SelectValue placeholder="Select your giving type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white ">
                        <SelectItem value="Zakat" className={"hover:bg-gray-200"}>Zakat</SelectItem>
                        <SelectItem value="Sadaqah" className={"hover:bg-gray-200"}>Sadaqah</SelectItem>
                        <SelectItem value="Sadaqah Jariah" className={"hover:bg-gray-200"}>Sadaqah Jariah</SelectItem>
                        <SelectItem value="Imdad / Hadi" className={"hover:bg-gray-200"}>Imdad / Hadi</SelectItem>
                        <SelectItem value="General donation" className={"hover:bg-gray-200"}>General donation</SelectItem>
                        <SelectItem value="Bank Interest ( Ribba )" className={"hover:bg-gray-200"}>Bank Interest ( Ribba )</SelectItem>
                        <SelectItem value="Where most needed" className={"hover:bg-gray-200"}>Where most needed</SelectItem>
                      </SelectContent>
                    </Select>
            </div>

            {/* Giving Levels */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Or select a giving level</h3>

              <div className="space-y-3">
                {givingLevels?.map((level) => (
                  <div
                    key={level._id}
                    onClick={() => handleLevelSelect(level)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedLevel?._id === level._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-gray-800">₹{level.amount}</h4>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">{level.headline}</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Help us help the Ummah Section */}
            {showHelpSection && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">💛</span>
                    Help us help the Ummah
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">
                    Because Giveummah doesn't charge a platform fee, we rely on the generosity of donors like you to
                    help make people. 💛
                  </p>

                  {/* Enhanced Progress Bar */}
                  <div className="mb-6 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Tip Progress</span>
                        <span className="text-xs text-gray-500">(₹{getCurrentTipAmount()} of your donation)</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">{sliderValue.toFixed(0)}%</span>
                    </div>

                    {/* Manual Slider for Progress Bar */}
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={sliderValue}
                        onChange={handleSliderChange}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Progress Bar Visual */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-500 ease-out relative"
                          style={{
                            width: `${Math.max(sliderValue, 2)}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Amount Display */}
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-600">
                        Current tip: <span className="font-semibold text-orange-600">₹{getCurrentTipAmount()}</span>
                        <span className="text-xs text-gray-500 ml-1">({sliderValue.toFixed(1)}% of donation)</span>
                      </p>

                      {sliderValue >= 20 && (
                        <p className="text-xs text-green-600 mt-1 font-medium">🎉 Thank you for your generous tip!</p>
                      )}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  {showCustomAmount ? (
                    <div className="flex items-center space-x-2 mb-3 bg-white rounded-lg p-3 border border-orange-200">
                      <span className="text-sm text-gray-600 font-medium">₹</span>
                      <input
                        type="number"
                        value={customTip}
                        onChange={(e) => handleCustomTipChange(e.target.value)}
                        placeholder="Enter custom tip amount"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 flex-1"
                      />
                      <span className="text-sm text-gray-600">INR</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCustomAmount}
                      className="text-orange-600 text-sm hover:underline font-medium"
                    >
                      + Custom amount
                    </button>
                  )}

                  {/* Quick Percentage Buttons */}
                  {/* <div className="flex flex-wrap gap-2 mt-4">
                    {[0, 5, 10, 15, 20].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => {
                          const baseAmount = selectedLevel ? selectedLevel.amount : Number.parseFloat(customAmount) || 0
                          const newTip = (baseAmount * (percent / 100)).toFixed(2)
                          setTip(Number.parseFloat(newTip))
                          setCustomTip(newTip)
                          setSelectedTip(null)
                          setSliderValue(percent)
                        }}
                        className={`px-3 py-1 border rounded-lg text-xs font-medium transition-all ${
                          Math.abs(sliderValue - percent) < 0.1
                            ? "border-orange-400 bg-orange-100 text-orange-700"
                            : "border-gray-300 text-gray-600 hover:border-orange-300"
                        }`}
                      >
                        {percent}%
                      </button>
                    ))}
                  </div> */}
                </div>
              </div>
            )}

            {/* Words of Support Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Words of support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Leave a message for this organizer.
                <br />
                Your message will appear on the fundraising page.
              </p>

              <div className="relative">
                <textarea
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  maxLength={maxMessageLength}
                  placeholder="Write your message here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {supportMessage.length}/{maxMessageLength}
                </div>
              </div>
            </div>

            {/* Give Button */}
            <div className="space-y-4">
              <button
                className="w-full bg-amber-700 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors transform hover:scale-105"
                onClick={handleGiveNow}
              >
                GIVE NOW - ₹{calculateTotal()}
              </button>

              <div className="text-center space-y-1">
                <p className="text-xs text-gray-500">
                  🔒 Checking out?{" "}
                  <Link to="/terms&conditions" className="text-blue-600 hover:underline cursor-pointer">
                    See our terms and conditions
                  </Link>
                </p>
                <p className="text-xs text-gray-500">
                  By continuing, you agree to LaunchGood's{" "}
                  <Link to="/terms&conditions" className="text-blue-600 hover:underline cursor-pointer">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacypolicy" className="text-blue-600 hover:underline cursor-pointer">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Review Section */}
          <div className="space-y-6">
            {/* Zakat Verification */}
            {campaignDetails.zakatVerified && (
              <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800">Zakat-verified campaign</span>
              </div>

              {/* <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isZakat}
                  onChange={(e) => setIsZakat(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Count this as your Zakat</span>
                  <br />
                  The organizer will use your donation as Zakat funds.
                </div>
              </label> */}
            </div>
            )}
            

            {/* Review Section */}
            <div className="space-y-4 bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800">Review</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Your giving amount</span>
                  <span className="font-medium">₹{getDisplayAmount()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Giveummah tip ({sliderValue.toFixed(0)}%)</span>
                  <span className="font-medium">₹{getCurrentTipAmount()}</span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800">Your total ({currency})</span>
                  <span className="text-gray-800">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GivingAmount
