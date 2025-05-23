import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Authpage from './pages/auth'
import Home from './pages/home/Home'

import Fundraisingcreate from './components/fundraisingForm/Fundraisingcreate'
import Dashboard from './pages/dashboard/Dashboard'
import Show from './components/joditEditor/Show'



function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Authpage />} />
      <Route path="/fundraisingForm" element={<Fundraisingcreate />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/show" element={<Show />} />
    
    
      
    </Routes>
    </>
  )
}

export default App
