import { Phone, Mail, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: `url('./assets/footer-bg.png')`,
        }}>
      {/* Background Image */}
      <div
        className=" "
        
      />

      {/* Overlay for better text readability */}
      <div className="" />

      {/* Content */}
      <div className="relative z-10">
        {/* Social Media Section */}
        

        {/* Main Footer Content */}
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Column 1 - Company Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    <img src={logo}></img>
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Give Ummah is an innovative crowdfunding platform designed to empower individuals and institutes to
                    raise funds for those in need.
                  </p>
                </div>

                {/* Decorative element */}
                <div className="flex items-center">
                  <svg className="w-16 h-8" viewBox="0 0 64 32" fill="none">
                    <path d="M2 16 Q16 8 32 16 T62 16" stroke="#D97706" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">7780836565</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">tariq@giveummah.com</span>
                  </div>
                </div>
              </div>

              {/* Column 2 - Ways to Give */}
              <div className="md:pt-25 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Ways to Give</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Featured Fundraisers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Discover
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Donate offline
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 - About GiveUmmah */}
              <div className="md:pt-25 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">About GiveUmmah</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms&conditions" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/security&compliance" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm">
                      Security & Compliance
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4 - Additional Links */}
              <div className="md:pt-25 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Support</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg font-medium"
              >
                <Instagram className="w-6 h-6" />
                Instagram
              </a>
                  </li>
                  <li>
                    <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg font-medium"
              >
                <Youtube className="w-6 h-6" />
                Youtube
              </a>
                  </li>
                  <li>
                     <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg font-medium"
              >
                <Facebook className="w-6 h-6" />
                Facebook
              </a>
                  </li>
                    <li>
                    <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg font-medium"
              >
                <Linkedin className="w-6 h-6" />
                Linkedin
              </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="button-footer py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-black text-sm font-medium">Copyright 2025 GiveUmmah private limited | All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
