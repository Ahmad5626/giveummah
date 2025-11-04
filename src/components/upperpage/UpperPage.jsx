import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const UpperPage = () => {
   const location =useLocation()
  const pathname = location.pathname
   useEffect(() => {
        window.scrollTo(0, 0);
   }, [pathname]);
  return (
    <div>
      
    </div>
  )
}

export default UpperPage
