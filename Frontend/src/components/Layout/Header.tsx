import React from 'react'
import Nave from './Nave'
import Footer from './Footer'

const Header = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <Nave />
        <div className="flex justify-between items-center h-16 bg-gray-100 px-4">
          {children}
        </div>
        <Footer />
    </>
  )
}

export default Header