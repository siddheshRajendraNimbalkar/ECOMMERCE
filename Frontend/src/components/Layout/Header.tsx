import React from 'react'
import Footer from './Footer'
import Nave from './Nave1'

const Header = ({children}:{children:React.ReactNode}) => {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
        <Nave />
        <div className="bg-gray-100">
          {children}
        </div>
        <Footer />
        </div>
    </>
  )
}

export default Header