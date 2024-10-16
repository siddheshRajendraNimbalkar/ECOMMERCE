
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';

const Title = () => {
    const images = [
        "https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20925w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=1225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201225w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=1525&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201525w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=1825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201825w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201850w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=2125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202125w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=2425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202425w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=2450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202450w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%202725w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203025w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203050w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3325&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203325w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203625w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203650w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=3925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%203925w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=4225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204225w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=4250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204250w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=4525&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204525w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=4825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204825w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=4850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%204850w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=5125&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%205125w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=5425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%205425w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=5450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%205450w,%20https://plus.unsplash.com/premium_photo-1681913261448-b0488050f8f6?q=80&w=5540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%205540w",
        "https://images.unsplash.com/photo-1725947275728-e91ab9293aa9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1681913759328-4a69d603299a?q=80&w=2045&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1708110920881-635419c3411f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]

    const navigate = useNavigate();
    const [image, setImage] = useState<string>(images[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            setImage(images[Math.floor(Math.random() * images.length)]);
        }, 1000);
        return () => clearInterval(interval);
    }, [navigate]);
  return (
    <div className='flex justify-center items-end h-[100vh] w-full bg-[#F6F6F1]'>
        {/* left side */}
        <div className='w-1/2 h-[100vh] flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-start md:w-[75%]'>
          <h1 className='text-4xl font-bold'>Effortless <br /> Storefront Creation</h1>
          <p>
            An eCommerce website lets businesses sell products or services online. 
            It includes features like product listings, shopping carts, and secure payments, 
            making it easy for customers to browse and buy items.
          </p>
          <button className='group bg-black text-white px-6 py-3 rounded-full mt-4 hover:scale-110 transition-all duration-300 relative overflow-hidden'>
            <span className='relative z-10 flex items-center'>
              Get Started
              <FaArrowRight className='ml-2 transform group-hover:translate-x-1 transition-transform duration-300' />
            </span>
            <span className='absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
            <span className='absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left delay-150'></span>
          </button>
        </div>
      </div>
        {/* right side */}
        <div className='w-1/2 h-[100vh] pl-16 pr-16 hidden md:flex justify-center items-center' >
                <div className='w-full bg-[#ACBFD5] rounded-md h-[80vh] flex justify-center items-center'>
                    <div className='overflow-hidden p-4 bg-blue-100 rounded-md'>
                        <img className='rounded-md hover:scale-110 transition-all duration-300' src={image} alt="image" />
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Title