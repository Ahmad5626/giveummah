import Footer from '@/components/footer/Footer'
import GivingAmount from '@/components/giveingAmount/GivingAmount'
import { Navbar } from '@/components/header/Navbar'
import React from 'react'


const Donation = () => {
  return (
    <div>
    <Navbar/>
      <GivingAmount />
      <Footer/>
    </div>
  )
}

export default Donation
