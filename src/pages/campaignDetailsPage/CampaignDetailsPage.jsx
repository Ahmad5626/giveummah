import { Navbar } from '@/components/header/Navbar'

import React from 'react'
// import CompaignDetails from '@/components/capmaignDetails/CapmaignDetails'
import GivenOption from '@/components/capmaignDetails/GivenOption'
import Footer from '@/components/footer/Footer'
import UpperPage from '@/components/upperpage/UpperPage'
const CampaignDetailsPage = () => {
  

  return (
    <>
    <UpperPage/>
      <div>
      <Navbar/>
      {/* <CompaignDetails/> */}
      <GivenOption/>
      <Footer/>
    </div>
    </>
  )
}

export default CampaignDetailsPage
