import { Heart, Share2, MapPin, Gift, Shield, Play } from "lucide-react"

function CompaignDetails(){
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-4 bg-gradient-to-r from-black to-amber-500 bg-clip-text text-transparent">
            Improve Lives of Refugees with Clean Water
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-darkBrownClr rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-darkYollowClr rounded-full"></div>
            </div>
            <span>Organized by</span>
            <span className="text-blue-600 font-medium">Good Planet International</span>
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
                  src="https://pmedia.launchgood.com/310264/feed_the_hungry_in_sudan_with_your_qurbani_Sadagaat%20LG%20banner%20with%20sh%20ammar%20shukry-700x525.png"
                  alt="Children accessing clean water from a well"
                  className="w-full h-64 md:h-124 object-cover"
                />
               
                
                {/* Text Overlay */}
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 px-4 py-2 rounded-lg">
                  <div className="text-lg md:text-xl font-bold">
                    <span className="text-green-600">PROVIDE</span>
                  </div>
                  <div className="text-lg md:text-xl font-bold">
                    <span className="text-green-600">CLEAN WATER</span>
                  </div>
                  <div className="text-lg md:text-xl font-bold">
                    <span className="text-green-600">FOR </span>
                    <span className="text-red-500">ROHINGYA!</span>
                  </div>
                </div>
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
                <div className="text-3xl md:text-4xl font-bold text-darkBrownClr mb-2">$37,913</div>
                <div className="text-sm text-gray-600 mb-4">raised of $250,000 USD goal</div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-[#000000] to-[#f8bb26] h-2 rounded-full" style={{ width: "90.2%" }}></div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    <strong>1696</strong> supporters
                  </span>
                  <span>
                    <strong>222</strong> days left
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="w-full bg-darkBrownClr text-white py-3 px-4 rounded-lg font-medium hover:bg-darkYollowClr transition-colors">
                  Donate
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
                  <span>Impact: Bangladesh</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Gift className="w-4 h-4" />
                  <span>UK Gift Aid</span>
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
  )
}

export default CompaignDetails
