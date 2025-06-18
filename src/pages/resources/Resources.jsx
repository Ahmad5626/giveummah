import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import { ExternalLink, Heart, Shield, Users, Target, CheckCircle, Globe, Handshake } from "lucide-react"


export default function Resources() {
  return (
    <>
    <UpperPage/>
    <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 ">
      {/* Hero Section */}

      <div className="pages-bg text-white py-16" >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl md:text-2xl opacity-90">How to raise funds for a charity, creative project, or a loved one or support incredible campaigns. Start building an inspired future!</p>
        </div>
      </div>

      <div className="container  px-4 py-12 max-w-7xl mx-auto">
        {/* CEO Section */}
      

        

        {/* Call to Action Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
         
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Whether you're looking to <span className="font-semibold text-darkBrownClr">start a fundraiser</span>,{" "}
            <span className="font-semibold text-lightYollowClr">donate to a cause</span>, or{" "}
            <span className="font-semibold text-darkYollowClr">offer your skills</span>, GiveUmmah is your trusted partner
            in creating impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button className="bg-lightYollowClr hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              How Do I Start A Signup?
            </button>
            <button className="bg-darkBrownClr hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              How Do I Start A Campaign?
            </button>
           
            <button className="bg-darkYollowClr hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              How To Give A Donation
            </button>
          </div>
          
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
