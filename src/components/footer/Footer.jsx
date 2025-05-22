import { Phone, Mail, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"


export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 ">
      <div className="container mx-auto px-4 py-12 px-4  md:px-20 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">GiveUmmah</h2>
            <p className="text-gray-600 text-sm">
              GiveUmmah is an innovative crowdfunding platform designed to empower individuals and institutes to raise
              funds for those in need.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span className="text-sm">7780836565</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">ganaiwali@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Ways to Give */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Ways to Give</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Featured Fundraisers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Discover
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Donate offline
                </Link>
              </li>
            </ul>
          </div>

          {/* About GiveUmmah */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">About GiveUmmah</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Safety & Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Follow</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                  <Facebook className="h-5 w-5" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                  <Twitter className="h-5 w-5" />
                  <span>X-Twitter</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                  <Youtube className="h-5 w-5" />
                  <span>Youtube</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-teal-900 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          Copyright 2025 Day Translations, Inc | All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
