import React, { useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";

const Nave = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${isOpen ? 'h-[100vh] bg-black' : 'bg-[#FEFFFE] p-1 pr-4 pl-4 pt-4 md:fixed top-0 w-full z-50'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold hidden md:block">ShopEase</div>
        {
          isOpen ? <div className="text-black text-lg font-bold block md:hidden"></div>
            : <div className="text-black text-lg font-bold block md:hidden">ShopEase</div>
        }
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-zinc-900 hover:text-black relative group">
            <span className="relative z-10">Home</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/product" className="text-zinc-900 hover:text-black relative group">
            <span className="relative z-10">Product</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/contact" className="text-zinc-900 hover:text-black relative group">
            <span className="relative z-10">Contact</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/about" className="text-zinc-900 hover:text-black relative group">
            <span className="relative z-10">About</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div className='text-gray-900 font-bold hidden md:flex pr-6'>
          <div className='flex justify-center items-center pr-2 hover:text-red-800 cursor-pointer relative group'>
            <span className="relative z-10">LOGIN</span>
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className='hover:font-bold cursor-pointer'>
            <CiShoppingCart style={{ fontSize: '2rem', color: 'black' }} className='pl-2 font-bold'/>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? 'text-white' : 'text-black'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden h-[100vh] p-4 bg-black">
          <div className="text-white  rounded-sm font-bold p-2 text-4xl w-2/5 bg-green-950 flex justify-center items-center bg-[radial-gradient(circle,_rgba(63,94,251,1)_0%,_rgba(252,70,107,1)_100%)]">
            <div>
              ShopEase
            </div>
          </div>
          <a href="/" className="block text-gray-300 hover:text-white p-2 text-4xl font-bold relative group">
            <span className="relative z-10">Home</span>
            
          </a>
          <a href="/product" className="block text-gray-300 hover:text-white p-2 text-4xl font-bold relative group">
            <span className="relative z-10">Product</span>
          </a>
          <a href="/contact" className="block text-gray-300 hover:text-white p-2 text-4xl font-bold relative group">
            <span className="relative z-10">Contact</span>
          </a>
          <a href="/about" className="block text-gray-300 hover:text-white p-2 text-4xl font-bold relative group">
            <span className="relative z-10">About</span>
          </a>
          <br /><br />
          <div className="block text-red-600 hover:text-rose-800 p-2 text-4xl font-bold relative group">
            <span className="relative z-10">Login</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nave;