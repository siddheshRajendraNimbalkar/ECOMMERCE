import React from 'react';

const Footer = () => {
  return (
    <>

      <div className='w-full h-[1px] bg-gray-400 flex justify-center items-center' />

      <footer className="bg-white text-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Company Name</h2>
              <p className="text-gray-500 hover:font-bold hover:text-black">© 2024 Company Name. All rights reserved.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul>
                <li className="mb-2"><a href="#" className="hover:font-bold">Home</a></li>
                <li className="mb-2"><a href="#" className="hover:font-bold">Shop</a></li>
                <li className="mb-2"><a href="#" className="hover:font-bold ">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:font-bold ">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="hover:font-bold">Facebook</a>
                <a href="#" className="hover:font-bold">Twitter</a>
                <a href="#" className="hover:font-bold">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className='w-full h-[1px] bg-gray-400 flex justify-center items-center' />

    </>
  );
};

export default Footer;
