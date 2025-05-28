import { Navbar } from '@/components/header/Navbar'

import React from 'react'
// import CompaignDetails from '@/components/capmaignDetails/CapmaignDetails'
import GivenOption from '@/components/capmaignDetails/GivenOption'
import Footer from '@/components/footer/Footer'
const CampaignDetailsPage = () => {
  return (
    <div>
      <Navbar/>
      {/* <CompaignDetails/> */}
      <GivenOption/>
      <Footer/>
    </div>
  )
}

export default CampaignDetailsPage
