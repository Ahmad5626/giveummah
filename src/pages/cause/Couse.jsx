import Footer from '@/components/footer/Footer'
import { Navbar } from '@/components/header/Navbar'
import UpperPage from '@/components/upperpage/UpperPage'
import { AuthContext } from '@/context/auth-context'
import React, { useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link, useLocation } from "react-router-dom"

const Couse = () => {
  const [currentData, setCurrentData] = useState({});
    const location = useLocation();
    const couseData=location.pathname.split("/")[2]
    // console.log(couseData);
    
     const {allCampaigns,allUserData,loading,recommendedCauses} = useContext(AuthContext)

     useEffect(() => {
       recommendedCauses.filter((item) => item.category === couseData).map((item) => setCurrentData(item))
       
     })
     const funded=1000
    //  console.log(currentData);
     
  return (
    <>
    <UpperPage/>
    <Navbar/>
      <div className=" flex items-center justify-center p-4">
      <div className=" ">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Content Section */}
            <div className="flex-1 p-8 lg:p-12 xl:p-16 md:w-[1200px] ">
              <div className="">
                <h1 className="text-4xl lg:text-xl xl:text-4xl font-bold text-gray-900 leading-tight mb-6">
                 {currentData.pageHeadline}
                </h1>

                <p className="text-gray-600 text-lg lg:text-xl mb-8 leading-relaxed">
                  {currentData.pageSubHeadline}
                </p>

                <button className="bg-[#f5a800] hover:bg-[] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200 mb-4">
                  {/* <Link to={ `${currentData.pageCta}`}>Give Directly</Link> */}
                  <Link to="https://giveummah.com/campaignDetails/685ce50500936cb379876a8e">Give Directly</Link>
                </button>

                
              </div>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 relative min-h-[300px] lg:min-h-[300px]">
              <img
                src={currentData.pageImage}
                alt="Child"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>





    </div>
<div className="w-full  mx-auto px-4  md:px-20 md:pt-10 pt-40">
      <div className="flex items-center justify-center mb-6">

       <div className="text-center">
          <h2 className="text-5xl text-center font-bold py-4 darkPurpleClr">Featured Fundraisers</h2>
          {/* <p className="text-muted-foreground">Sponsored</p> */}
        </div>
         </div>
    {loading ? (
  <div className="text-center py-12 mx-auto  w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading campaigns...</p>
              </div>
):
<>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
  {/* {allCampaigns.map((campaign,index) => ( */}
   {allCampaigns.filter((campaign) => campaign.status === "Active" && campaign.category === couseData).sort((a, b) => a.ranking - b.ranking).map((campaign,index) => (
  

           <Card
              className="new-card h-full overflow-hidden  transition-all duration-300 pt-0 pb-2 rounded-lg border-transparent cursor-pointer"
             key={index}
            >
             <Link to={`/campaignDetails/${campaign._id}`}>
               <div className="relative overflow-hidden h-70">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out " 
                
                />
                  <img src={campaign.featureImageUrl} alt="" className="w-full h-full object-cover  " />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
              </div>
              </Link>
              <CardContent className="">
                <div className="flex items-center gap-2  ">
                   {/* <div className="h-6 w-6 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={campaign.logo || "/placeholder.svg"}
                      alt={campaign.fundType}
                      className="h-full w-full object-cover"
                    />
                  </div>  */}

                  {allUserData.filter((user) => user._id === campaign.createdBy).map((user) =>{
                    return(
                      <>
                        <span className="text-sm  mb-2">{user.instituteName ? user.instituteName : user.fullName}</span>
                      </>
                    )
                  })}
                  
                </div>
                <Link to={`/campaignDetails/${campaign._id}`} className="Hover:text-primary">
                  <h3 className="text-lg font-semibold  line-clamp-2 h-14">{campaign.campaignTitle}</h3>
                </Link>
                <div className="flex justify-between text-sm text-muted-foreground py-2 ">
                  <span>43 Donors</span>
                  <span>
                  {Math.max(Math.ceil((new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)), 0)} days left
                </span>
                </div>
                 <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div className="bg-gradient-to-r from-[#000000] to-[#f8bb26] h-2 rounded-full" style={{ width: `${Math.min((funded / campaign.goalAmount) * 100, 100)}%` }}></div>
                </div>
                  {/* <Progress value={progress} className=" h-2 bg-gradient-to-r from-[#000000] to-[#f8bb26] my-4 p-0" /> */}
               
                <div className="flex justify-between items-end ">
                  <div>
                    <p className="text-2xl font-bold">₹{campaign.goalAmount}</p>
                    <p className="text-sm text-muted-foreground">funded of ₹{funded}</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to={`/donation/${campaign._id}`} className="rounded-full px-10 py-2 text-xl text-white my-2 bg-[#fea000] hover:bg-green-600 transition-all duration-300">
                      Donate
                    </Link>
                  </motion.div>
                </div>

                
              </CardContent>
              <CardFooter className="flex justify-between pt-0 ">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-all">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50 transition-all">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                {campaign.zakatVerified && (
                  <Badge variant="outline" className="text-[#fea000] border-green-200 bg-green-50 gap-1 mt-2">
                    Zakat-verified
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M7.75 12L10.58 14.83L16.25 9.17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Badge>
                )}
              </CardFooter>
             
            </Card>
))}
</div>
    
</>

} 
</div>


    <Footer/>
    </>
  )
}

export default Couse
