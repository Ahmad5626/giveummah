import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Authpage from './pages/auth'
import Home from './pages/home/Home'

import Fundraisingcreate from './components/fundraisingForm/Fundraisingcreate'
import Dashboard from './pages/dashboard/Dashboard'
import Show from './components/joditEditor/Show'
import CKEditor from './components/ckediter/Ckediter'
import CampaignDetailsPage from './pages/campaignDetailsPage/CampaignDetailsPage'
import Donation from './pages/donation/Donation'



function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Authpage />} />
      <Route path="/fundraisingForm" element={<Fundraisingcreate />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/show" element={<Show />} />
      <Route path="/campaignDetails" element={<CampaignDetailsPage />} />
      <Route path="/donation" element={<Donation />} />
      <Route path="/ckeditor" element={<CKEditor />} />
    
    
      
    </Routes>
    </>
  )
}

export default App
