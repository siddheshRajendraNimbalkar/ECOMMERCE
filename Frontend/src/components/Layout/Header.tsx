import React from 'react'
import Footer from './Footer'
import Nave from './Nave1'

const Header = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <Nave />
        <div className="bg-gray-100">
          {children}
        </div>
        <Footer />
    </>
  )
}

export default Header