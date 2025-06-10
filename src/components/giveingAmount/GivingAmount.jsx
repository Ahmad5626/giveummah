import { AuthContext } from '@/context/auth-context';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const GivingAmount = () => {
  const {allCampaigns, campaignDetails, setCampaignDetails,allUserData,handleCreateComment,givingLevels,setGivingLevels} = useContext(AuthContext)
  const { id } = useParams();
  const [customAmount, setCustomAmount] = useState('20.00');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [isZakat, setIsZakat] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('googlepay');
  const [shareEmail, setShareEmail] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [supportMessage, setSupportMessage] = useState('');
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  
  const tipAmounts = [5, 10, 15, 20];
  const [totalAmount, setTotalAmount] = useState(0);
  const maxMessageLength = 500;

  const handleTipSelect = (amount) => {
     
    setSelectedTip(amount);
    setCustomTip('');
    setShowCustomAmount(false);
  };

  const handleCustomAmount = () => {
    setShowCustomAmount(true);
    setSelectedTip(null);
  };
  // const givingLevels = [
  //   {
  //     id: 1,
  //     amount: 21,
  //     headline: 'Fresh Meat Shadaqah 1 Family',
  //     subHeadline: 'Alhamdulillah, may Allah reward you with the best of rewards and grant you Jannatul Firdaus!',
      
  //   },
  //   {
  //     id: 2,
  //     amount: 101,
  //     headline: 'Fresh Meat Shadaqah 5 Families',
  //     subHeadline: 'Alhamdulillah, may Allah reward you with the best of rewards and grant you Jannatul Firdaus!',
     
  //   }
  // ];

  const calculateTotal = () => {
    const amount = selectedLevel ? selectedLevel.amount : parseFloat(customAmount) || 0;
    const total = (amount + tip).toFixed(2);
    
    return total
  };

  const getDisplayAmount = () => {
    return selectedLevel ? selectedLevel.amount.toFixed(2) : customAmount;
  };

  const location =useLocation();
  const state = location.state;
  console.log(state);
  


   useEffect(() => {
        allCampaigns.map( (campaign) => {
          if (campaign._id === id) {
            
            setCampaignDetails(campaign);
          }
        });
        setGivingLevels(campaignDetails.givenAmount);
        setTip(selectedTip || 0);
       
      }, [allCampaigns, campaignDetails, id, selectedTip]);
      
return (
    <>
  <div className="max-w-7xl mx-auto mt-10 p-10 md:py-10 md:px-0 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Donation Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Support{' '}
              <span className="font-semibold text-gray-800 underline cursor-pointer">
                {campaignDetails.campaignTitle}
              </span>
            </p>
            <p className="text-sm ">
             <span>Organized by  </span> 
              {allUserData.filter((user) => user._id === campaignDetails.createdBy).map((user) => (
              <Link to={`/profile/${user._id}` } key={user._id} className="text-blue-600 font-medium text-blue-600">{user.instituteName? user.instituteName : user.fullName}</Link>
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
                    setCustomAmount(e.target.value);
                    setSelectedLevel(null);
                  }}
                  className="px-4 py-3 text-lg font-medium text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
              
             
            </div>
          </div>

          {/* Giving Levels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Or select a giving level</h3>
            
            <div className="space-y-3">
              {givingLevels?.map((level) => (
                <div
                  key={level._id}
                  onClick={() => {
                    setSelectedLevel(level);
                    setCustomAmount(level.amount.toString());
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLevel?._id === level._id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-800">₹{level.amount}</h4>
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-2">{level.headline}</h5>
                  {/* <p className="text-sm text-blue-600 mb-2">{level.subHeadline}</p> */}
                  {/* <p className="text-sm text-gray-500">{level.claimed} claimed</p> */}
                </div>
              ))}
            </div>
          </div>

           <div className="max-w-2xl mx-auto  bg-white">
      {/* Help us help the Ummah Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Help us help the Ummah
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Because Giveummah doesn't charge a platform fee, we rely on the generosity of 
          donors like you to help make people. 💛
        </p>
        
        {/* Tip Amount Buttons */}
        <div className="flex flex-wrap gap-3 mb-3">
          {tipAmounts?.map((amount) => (
            <button
              key={amount}
              onClick={() => handleTipSelect(amount)}
              className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                selectedTip === amount
                  ? 'border-orange-400 bg-orange-50 text-orange-600'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-lg">💛</div>
                <div className="text-sm">₹{amount} INR</div>
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        {showCustomAmount ? (
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm text-gray-600">₹</span>
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              placeholder="Enter amount"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
            <span className="text-sm text-gray-600">INR</span>
          </div>
        ) : (
          <button
            onClick={handleCustomAmount}
            className="text-blue-600 text-sm hover:underline"
          >
            Custom amount
          </button>
        )}
      </div>

     
    
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
        <button className="w-full  bg-darkBrownClr hover:bg-darkYollowClr   text-white font-semibold py-4 px-6 rounded-lg " onClick={() => handleCreateComment({ comment: supportMessage }, campaignDetails._id)}>
          GIVE NOW
        </button>
        
        <div className="text-center space-y-1">
          <p className="text-xs text-gray-500">
            🔒 Checking out? <Link to="/terms&conditions" className="text-blue-600 hover:underline cursor-pointer">See our terms and conditions</Link>
          </p>
          <p className="text-xs text-gray-500">
            By continuing, you agree to LaunchGood's{' '}
            <Link to="/terms&conditions" className="text-blue-600 hover:underline cursor-pointer">Terms of Service</Link> and{' '}
            <Link to="/privacypolicy" className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
        </div>

        {/* Right Column - Review Section */}
        <div className="space-y-6 ">
          {/* Zakat Verification */}
          <div className="bg-[#F4F4F4]  p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800">Zakat-verified campaign</span>
            </div>
            
            <label className="flex items-start space-x-3 cursor-pointer">
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
            </label>
          </div>

          {/* Review Section */}
          <div className="space-y-4 bg-[#F4F4F4] rounded-lg p-6" >
            <h3 className="text-lg font-semibold text-gray-800">Review</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Your giving amount</span>
                <span className="font-medium">₹{getDisplayAmount()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Giveummah tip</span>
                <span className="font-medium">₹{tip}.00</span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between font-semibold">
                <span className="text-gray-800">Your total ({currency})</span>
                <span className="text-gray-800">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Decorative Plant Illustration */}
          
        </div>
      </div>
    </div>
     
    </>
  );
};

export default GivingAmount;