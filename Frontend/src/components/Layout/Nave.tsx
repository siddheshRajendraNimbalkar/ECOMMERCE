import React, { useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";

const Nave = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#171717] p-1 pr-4 pl-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold hidden md:block">TECHBROS</div>
        {
          isOpen ? <div className="text-white text-lg font-bold block md:hidden"></div>
            : <div className="text-white text-lg font-bold block md:hidden">TECHBROS</div>
        }
        <div className="hidden md:flex space-x-4 ">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">Product</a>
          <a href="#" className="text-gray-300 hover:text-white">Services</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </div>
        <div className='text-gray-300 hidden md:flex pr-4'>
          <div className='flex justify-center items-center hover:text-red-800 cursor-pointer'>
          LOGIN
          </div>
          <div className='hover:font-bold cursor-pointer'>
            <CiShoppingCart style={{ fontSize: '2rem' }} className='pl-2 font-bold'/>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden h-[100vh] ">
          <div className="text-white font-bold p-2 text-4xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 hover:from-green-600 hover:via-indigo-400 hover:to-blue-600 inline-block text-transparent bg-clip-text">TECHBROS</div>
          <a href="/" className="block text-gray-300 hover:text-white p-2 text-4xl font-bold">Home</a>
          <a href="#" className="block text-gray-300 hover:text-white p-2  text-4xl font-bold">Product</a>
          <a href="#" className="block text-gray-300 hover:text-white p-2  text-4xl font-bold" >Services</a>
          <a href="#" className="block text-gray-300 hover:text-white p-2  text-4xl font-bold">Contact</a>
          <br /><br />
          <div className="block text-red-600 hover:text-rose-800 p-2  text-4xl font-bold">Login</div>
        </div>
      )}
    </nav>
  );
};

export default Nave;
