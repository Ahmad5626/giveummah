import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Authpage from './pages/auth'
import Home from './pages/home/Home'

import Fundraisingcreate from './components/fundraisingForm/Fundraisingcreate'
import Dashboard from './pages/dashboard/Dashboard'
import Show from './components/joditEditor/Show'
// import CKEditor from './components/ckediter/Ckediter'
import CampaignDetailsPage from './pages/campaignDetailsPage/CampaignDetailsPage'
import Donation from './pages/donation/Donation'
import TextEditor from './components/ckediter/Texteditor'
import About from './pages/about/About'
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy'
import TermsConditions from './pages/terms&conditions/Terms&Conditions'
import Profile from './pages/profile/Profile'
import SecurityCompliance from './pages/security&Compliance/Security&Compliance'
import Search from './pages/search/Search'
import Pay from './pages/pay/Pay'
import Status from './pages/pay/Status'
import Couse from './pages/cause/Couse'
import FundraiserCampaigns from './pages/dashboard/Edit'
import Resources from './pages/resources/Resources'
import ZakatCalculator from './pages/zakat/zakat'



function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Authpage />} />
      <Route path="/fundraisingForm" element={<Fundraisingcreate />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/campaignDetails/:id" element={<CampaignDetailsPage />} />
      <Route path="/donation/:id" element={<Donation />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      <Route path="/terms&conditions" element={<TermsConditions />} />
      <Route path="/security&compliance" element={<SecurityCompliance />} />
      <Route path="/search" element={<Search />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/status/:merchantTx" element={<Status />} />
      <Route path="/cause/:category" element={<Couse />} />
      <Route path="/edit" element={<FundraiserCampaigns />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/zakatcalculator" element={<ZakatCalculator />} />
      {/* <Route path="/ckeditor" element={<TextEditor />} /> */}
      {/* <Route path="/show" element={<Show />} /> */}
    
    
      
    </Routes>
    </>
  )
}

export default App
