"use client"

import { Navbar } from "@/components/header/Navbar"
import { Button } from "@/components/ui/button"



import { useState } from "react"
import { Search } from "lucide-react"
import Aurora from "@/components/background/Aurora"
import CampaignCardSection from "@/components/homepage/campaignCardSection/CampaignCardSection"
import RecommendedCauses from "@/components/homepage/RecommendedCauses/RecommendedCauses"
import Improve from "@/components/homepage/improve/Improve"
import FundraisingSection from "@/components/homepage/fundraisingSection/FundraisingSection"
import DonationTracker from "@/components/homepage/donationTracker/DonationTracker"
import Footer from "@/components/footer/Footer"
import Hero from "@/components/homepage/hero/Hero"
import InstituteSlider from "@/components/homepage/inspiringInstitutes/InspiringInstitutes"

export default function Home() {
 
  return (
    <>
      <Navbar />
      <Hero/>
      <CampaignCardSection/>
      <RecommendedCauses/>
      <Improve/>
      <InstituteSlider/>
      <FundraisingSection/>
      <DonationTracker/>
      <Footer/>


    </>
  )
}
