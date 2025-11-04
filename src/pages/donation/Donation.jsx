import Footer from '@/components/footer/Footer'
import GivingAmount from '@/components/giveingAmount/GivingAmount'
import { Navbar } from '@/components/header/Navbar'
import UpperPage from '@/components/upperpage/UpperPage'
import React from 'react'


const Donation = () => {
  return (
    <div>
    <Navbar/>
    <UpperPage/>
      <GivingAmount />
      <Footer/>
    </div>
  )
}

export default Donation
