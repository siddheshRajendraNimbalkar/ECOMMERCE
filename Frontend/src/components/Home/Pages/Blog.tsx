import React from 'react'

const Blog = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className="relative  w-[80%] h-[40vh] flex justify-center items-center overflow-hidden bg-gray-100 p-6">
      {/* First image at the bottom left */}
      <img
        src="https://images.unsplash.com/photo-1676790408057-b56c464beb0f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bottom Left"
        className="hidden md:block absolute md:top-32 ld:bottom-0 left-0 lg:m-2 w-24 h-32 rounded-md"
      />

      {/* Second image at the top right */}
      <img
        src="https://plus.unsplash.com/premium_photo-1669977749936-1343d0b0b4d9?q=80&w=474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Top Right"
        className="absolute hidden md:block top-0 right-0 m-2 w-28 h-40 rounded-md"
      />

      {/* Third image at the bottom right */}
      <img
        src="https://plus.unsplash.com/premium_photo-1674669321691-958db874f59e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bottom Right"
        className="hidden absolute lg:block top-40 right-28 w-32 h-32 rounded-md"
      />

      <div className="h-full w-full bg-[#BD9278] rounded-lg shadow-lg overflow-hidden">
        <div className="h-[25vh] flex flex-col justify-center items-center text-center space-y-4 px-4">
          <h1 className="text-wrap font-bold text-white leading-tight">
            Get Started and Buy the Best Product for You
          </h1>
          <p className="text-white max-w-2xl">
            Start your free trial with Shopify today—use these resources to guide you through every step of the process.
          </p>
        </div>
        <div className="h-[10vh] flex justify-center items-start gap-4 ">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Get Started
          </button>
          <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
            Products
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Blog
