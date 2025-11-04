import Footer from "@/components/footer/Footer"
import { Navbar } from "@/components/header/Navbar"
import UpperPage from "@/components/upperpage/UpperPage"
import { ExternalLink, Heart, Shield, Users, Target, CheckCircle, Globe, Handshake } from "lucide-react"
import { Link } from "react-router-dom"


export default function AboutUs() {
  return (
    <>
    <UpperPage/>
    <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 ">
      {/* Hero Section */}

      <div className="pages-bg text-white py-16" >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About GiveUmmah</h1>
          <p className="text-xl md:text-2xl opacity-90">Empowering Generosity, Transforming Lives</p>
        </div>
      </div>

      <div className="container  px-4 py-12 max-w-7xl mx-auto">
        {/* CEO Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className=" pages-bg rounded-full flex items-center justify-center text-white text-4xl font-bold">
              <img src="./assets/TariqWali.png">

              </img>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Tariq Wali</h2>
              <p className="text-green-600 font-semibold mb-4">CEO - GiveUmmah</p>
              <a
                href="https://www.linkedin.com/in/tariq-wali-a948a85/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink size={16} />
                LinkedIn Profile
              </a>
              <p className="text-gray-600 mt-4 leading-relaxed">
               Tariq Wali is the visionary founder and CEO of GiveUmmah. Driven by a deep-rooted belief in the power of collective charity, he launched GiveUmmah to bridge the gap between modern technology and the timeless Islamic tradition of generosity. His leadership is guided by a single mission: to empower the global Muslim community to uplift itself through a trusted, transparent, and transformative platform, ensuring every donation makes a meaningful impact

He is a transformative technology leader with over a decade of experience driving innovation at scale. Passionate about building and empowering high-performing teams, he specializes in turning bold visions into reality—whether pioneering AI-driven platforms, architecting blockchain ecosystems, or leading organizational growth from startups to industry disruptors. Known for strategic clarity and execution excellence, he combines deep technical expertise with a relentless focus on delivering exceptional user experiences. A catalyst for change, he thrives on solving complex challenges, fostering cultures of innovation, and scaling businesses with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-darkYollowClr" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
           GiveUmmah - Empowering Generosity, Connecting the Ummah
 
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
           Welcome to GiveUmmah, a trusted social crowdfunding platform built by the Ummah, for the Ummah. We are a section-8 non-profit NGO with no commercial/profit motive CIN: U88900JK2025NPL017747. 

          </p>
             <p className="text-gray-600 leading-relaxed text-lg mt-4">
          Our story began with a simple yet profound realization: the Muslim community needed a dedicated, free, and technologically advanced platform that truly aligns with its charitable spirit. In a world of growing need, we sought to bridge the gap between generous hearts and worthy causes, making the act of giving simple, transparent, and impactful for everyone.
 

          </p>
             <p className="text-gray-600 leading-relaxed text-lg mt-4">
           GiveUmmah is a pioneering social donation platform dedicated to revolutionizing charitable giving in India. We provide a secure, transparent, and community-driven space where individuals and organizations can raise funds for meaningful causes—whether for education, healthcare, social welfare, or personal emergencies.


          </p>
             <p className="text-gray-600 leading-relaxed text-lg mt-4">
          Driven by the Islamic values of charity (Sadaqah) and community responsibility, we harness the power of technology to foster a more compassionate and connected global Ummah. GiveUmmah is more than just a platform—it is a movement to revolutionize charitable giving for every Muslim, regardless of their income level.


          </p>
             <p className="text-gray-600 leading-relaxed text-lg mt-4">
          Our platform bridges the gap between generous donors and those in need, ensuring that every contribution makes a real difference. Through donation campaigns, Sadqah-Hours initiatives, and skill-based donations, we empower people to uplift lives with trust and accountability.

          </p>
        </div>

        {/* Mission Section */}
        <div className="pages-bg text-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-white" size={32} />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg leading-relaxed">
            Our mission is to simplify and amplify charitable giving by providing a 100% free, Sharia-compliant, and secure crowdfunding platform, one for the Ummah. We are dedicated to ensuring that 100% of every donation reaches its intended cause, supporting educational, social, and community-driven initiatives as well as personal emergencies.

          </p>
        </div>


         {/* Who We Serve  */}
        <div className="pages-bg text-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-white" size={32} />
            <h2 className="text-3xl font-bold">Who We Serve</h2>
          </div>
          <p className="text-lg leading-relaxed">
         We empower people to give in ways that extend beyond financial contributions:


          </p>
           <p className="text-lg leading-relaxed">
<b>Islamic Education:</b> Supporting *Madrasas, **Ulama* (religious scholars), and *Talaba ul-Deen* (students of Islamic knowledge).


          </p>

          <p className="text-lg leading-relaxed">
<b>Institutions & NGOs:</b> Aiding Islamic organizations, trusts, and social enterprises in sustaining and growing their work.


          </p>
            <p className="text-lg leading-relaxed">
<b>Individuals in Need:</b> Providing a lifeline for the *poor, the **sick*, and families facing genuine hardship and personal emergencies.


          </p>
        </div>


          {/* Our Unique Approach to Giving  */}
        <div className="pages-bg text-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-white" size={32} />
            <h2 className="text-3xl font-bold">Our Unique Approach to Giving</h2>
          </div>
          <p className="text-lg leading-relaxed">
         We empower people to give in ways that extend beyond financial contributions:


          </p>
           <p className="text-lg leading-relaxed">
<b>Crowdfunding Campaigns:</b> The cornerstone of our platform, allowing for collective support for specific projects and needs.



          </p>

          <p className="text-lg leading-relaxed">
<b>Sadaqah-Hours Initiatives:</b>A innovative concept that allows you to donate the value of your time for a noble cause.



          </p>
            <p className="text-lg leading-relaxed">
<b>Skill-Based Donations:</b> Enabling professionals to offer their expertise and services to those in need.



          </p>
        </div>



         {/* Donation usage transparency  */}
        <div className="pages-bg text-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-white" size={32} />
            <h2 className="text-3xl font-bold">Donation usage transparency</h2>
          </div>
          <p className="text-lg leading-relaxed">
         At GiveUmmah, we uphold a sacred trust. Every donation you make is dedicated solely to its intended charitable cause. We operate on a 100% donation model, ensuring that funds collected are used exclusively for the aid and empowerment of beneficiaries, with no deductions for platform administration. Our rigorous vetting and transparent reporting provide you with the confidence that your contribution is creating the impact you intended.


          </p>
           
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-darkYollowClr" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">How GiveUmmah Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Launch a Campaign</h3>
              </div>
              <p className="text-gray-600">
                Individuals, NGOs, schools, and trusts can create verified fundraising campaigns for genuine needs.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Donate with Confidence</h3>
              </div>
              <p className="text-gray-600">
                Supporters contribute in <span className="font-semibold">Indian Rupees (INR)</span> via our secure{" "}
                <span className="font-semibold">Payment Gateway</span>, ensuring full transparency.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Funds Disbursement</h3>
              </div>
              <p className="text-gray-600">
                Once a campaign reaches its goal, funds are released directly to the beneficiary, with clear tracking.
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Skill & Service Donations</h3>
              </div>
              <p className="text-gray-600">
                Beyond money, users can donate their expertise (legal, medical, educational) to those in need.
              </p>
            </div>
          </div>
        </div>


        

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-darkYollowClr" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Why Choose GiveUmmah?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Transparency</h3>
                <p className="text-gray-600">
                  Every rupee is accounted for, with real-time updates on fund utilization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Campaigns</h3>
                <p className="text-gray-600">Rigorous vetting ensures only legitimate causes receive support.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-purple-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community-Driven</h3>
                <p className="text-gray-600">
                  A social platform fostering collaboration among students, professionals, NGOs, and everyday citizens.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="text-orange-600 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Shariah-Compliant & Inclusive</h3>
                <p className="text-gray-600">Open to all, respecting ethical and legal guidelines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="pages-bg text-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-white" size={32} />
            <h2 className="text-3xl font-bold">Our Vision</h2>
          </div>
          <p className="text-lg leading-relaxed">
            We envision an Ummah where <span className="font-semibold">no plea for help goes unheard</span>, where
            communities unite to create sustainable change. GiveUmmah is more than a platform—it's a{" "}
            <span className="font-semibold">movement of compassion</span>, where every act of giving strengthens
            society.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Handshake className="text-darkYollowClr" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Join Us in Making a Difference</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
            Whether you're looking to <span className="font-semibold text-darkBrownClr">start a fundraiser</span>,{" "}
            <span className="font-semibold text-lightYollowClr">donate to a cause</span>, or{" "}
            <span className="font-semibold text-darkYollowClr">offer your skills</span>, GiveUmmah is your trusted partner
            in creating impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-darkBrownClr hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            <Link to="/fundraisingForm">

              Start a Campaign
            </Link>
            </button>
            <button className="bg-lightYollowClr hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            <Link to="/campaignDetails/6858f205e720a63f47739199">

              Donate Now
            </Link>
            </button>
            {/* <button className="bg-darkYollowClr hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Offer Skills
            </button> */}
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-8">
            Together, let's build a future where kindness knows no limits.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
