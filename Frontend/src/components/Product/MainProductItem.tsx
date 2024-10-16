import React, { useState } from 'react'

var data ={
  _id: 1,
  name: "Product",
  price: 100,
  description: "This is a description",
  rating: 4.5,
  images: [
    {
      public_id: "image1",
      product_URL: "https://images.unsplash.com/photo-1590770357970-ec6480b368c0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      public_id: "image2",
      product_URL: "https://images.unsplash.com/photo-1725695788386-ddb9d7ea1258?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

  ],
  category: "category",
  stock: 10,
  numReviews: 10,
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",

}
const MainProductItem = () => {
  const [Image, setImage] = useState<string>(data.images[0].product_URL);
  return (
    <>
      <div className='min-h-[100vh] w-full  md:flex justify-center items-center'>
          <div className='min-h-[80vh] w-full md:w-1/2 '>
            <div className="flex justify-center items-center gap-4">
                <div className="scroller h-[60vh] w-[15%]  rounded-md overflow-auto scrollbar-hide lg:h-[70vh] lg:w-[10%]">
                    {
                      data.images.map((image) => {
                        return (
                          <img
                            key={image.public_id}
                            src={image.product_URL}
                            className="w-full h-20 object-cover rounded-md pb-1"
                            onClick={() => setImage(image.product_URL)}
                          />
                        )
                      })
                      
                    }
                    
                </div>
                <div className="mainTmage h-[75vh]  w-[75%] lg:h-[80vh] lg:w-[70%] bg-blue-950 rounded-md">
                    <img
                      src={Image}
                      className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
          </div>
          <div className='min-h-[80vh] w-full md:w-1/2 bg-blue-800'>
              
          </div>
      </div>
    </>
  )
}

export default MainProductItem